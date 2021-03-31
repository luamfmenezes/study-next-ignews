import { NextApiRequest, NextApiResponse } from "next";

import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set(["checkout.session.completed"]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const buf = await buffer(req);

      const secret = req.headers["stripe-signature"];

      let event: Stripe.Event;

      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (relevantEvents.has(event.type)) {
        switch (event.type) {
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            break;
        }
      }

      res.status(200).end();
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method not allowed");
    }
  } catch (err) {
    return res.status(400).send("Webhook error");
  }
};
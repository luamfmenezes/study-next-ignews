import { signIn, useSession } from "next-auth/client";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./styles.module.scss";

interface SubscriveButtonProps {
  priceId: string;
}

export const SubscriveButton = ({ priceId }: SubscriveButtonProps) => {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      console.log(sessionId);

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscriveButton}
    >
      Subscribe now
    </button>
  );
};

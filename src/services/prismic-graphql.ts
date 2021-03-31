import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

export const prismicGraphql = new ApolloClient({
  link: PrismicLink({
    uri: process.env.PRISMIC_URL,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    repositoryName: "nextjs-ignews",
  }),
  cache: new InMemoryCache(),
});

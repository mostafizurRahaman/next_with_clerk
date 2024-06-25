import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/api/graphql", // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

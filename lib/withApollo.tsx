import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import nextWithApollo from "next-with-apollo";
import { useRouter } from "next/router";

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: new HttpLink({
        uri: "https://rickandmortyapi.com/graphql",
          headers: {
        ...(headers as Record<string, string>),
        "my-header": "blah",
        },
      }),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;

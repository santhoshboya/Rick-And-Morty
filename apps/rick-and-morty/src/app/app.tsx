import NxWelcome from './nx-welcome';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const RICK_AND_MORTY_GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

const client = new ApolloClient({
  uri: RICK_AND_MORTY_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <NxWelcome title="rick-and-morty" />
    </ApolloProvider>
  );
}

export default App;

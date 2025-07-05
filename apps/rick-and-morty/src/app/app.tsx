import NxWelcome from './nx-welcome';
import { EpisodesListController } from './ui/components/Episodes/EpisodesListController';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { EpisodesProvider } from './data-access/StoreProvider/EpisodesContext';

const RICK_AND_MORTY_GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

const client = new ApolloClient({
  uri: RICK_AND_MORTY_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});


export function App() {
  return (
    <ApolloProvider client={client}>
      <EpisodesProvider>
          {/* <NxWelcome title="rick-and-morty" />*/}
          <EpisodesListController />
      </EpisodesProvider>
    </ApolloProvider>
  );
}

export default App;

import NxWelcome from './nx-welcome';
import { EpisodesListController } from './ui/components/Episodes/EpisodesListController';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { EpisodesProvider } from './data-access/StoreProvider/EpisodesContext';
import { RICK_AND_MORTY_GRAPHQL_ENDPOINT } from './data-access/constants/apiconsts';
import { EpisodeDetailsProvider } from './data-access/StoreProvider/EpisodeDetailsContext';
import { CharacterDetailsProvider } from './data-access/StoreProvider/CharacterDetailsContext';
import { Routes, Route } from 'react-router-dom';
import CharacterDetailsController from './ui/Controllers/GetCharacterDetails/CharacterDetailsController';

const client = new ApolloClient({
  uri: RICK_AND_MORTY_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});



export function App() {
  return (
    <ApolloProvider client={client}>
      <EpisodesProvider>
        <EpisodeDetailsProvider>
          <CharacterDetailsProvider>
            <Routes>
              <Route path="/" element={<EpisodesListController />} />
              <Route path="/character/:id" element={<CharacterDetailsController />} />
            </Routes>
          </CharacterDetailsProvider>
        </EpisodeDetailsProvider>
      </EpisodesProvider>
    </ApolloProvider>
  );
}

export default App;

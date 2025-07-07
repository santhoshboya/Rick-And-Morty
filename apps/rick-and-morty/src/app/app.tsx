import { Routes, Route } from 'react-router-dom';
import './i18n/i18n';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { EpisodesProvider } from './data-access/StoreProvider/EpisodesContext';
import { ROUTE_EPISODES, ROUTE_CHARACTER_DETAILS } from './ui/constants/RoutePaths';
import { RICK_AND_MORTY_GRAPHQL_ENDPOINT } from './data-access/constants/ApiConsts';
import { EpisodeDetailsProvider } from './data-access/StoreProvider/EpisodeDetailsContext';
import { CharacterDetailsProvider } from './data-access/StoreProvider/CharacterDetailsContext';
import EpisodesRouteComponent from './ui/routes/Episodes/EpisodesRouteComponent';
import CharacterDetailsRouteComponent from './ui/routes/CharacterDetails/CharacterDetailsRouteComponent';

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
              <Route path="/" element={<EpisodesRouteComponent />} />
              <Route path={ROUTE_EPISODES}>
                <Route index element={<EpisodesRouteComponent />} />
                <Route path=":id" element={<EpisodesRouteComponent />} />
                <Route path=":id/:tabId" element={<EpisodesRouteComponent />} />
              </Route>
              <Route path={ROUTE_CHARACTER_DETAILS(':id')} element={<CharacterDetailsRouteComponent />} />
            </Routes>
          </CharacterDetailsProvider>
        </EpisodeDetailsProvider>
      </EpisodesProvider>
    </ApolloProvider>
  );
}

export default App;

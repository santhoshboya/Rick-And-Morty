import { gql, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
// Types for query variables and response
type EpisodesQueryVars = {
  page?: number;
};

type EpisodeInfo = {
  count: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

type Episode = {
  name: string;
  id: string;
  episode: string;
  created: string;
  air_date: string;
};

type EpisodesQueryData = {
  episodes: {
    info: EpisodeInfo;
    results: Episode[];
  };
};

const GetEpisodesDocument = gql`
  query Episodes($page: Int) {
  episodes(page: $page) {
    info {
      count
      next
      pages
      prev
    }
    results {
      name
      id
      episode
      created
      air_date
    }
  }
}
`;

/**
 * Apollo hook to fetch episodes using the Rick and Morty GraphQL API.
 * Uses endpoint from constants.
 * @param page Page number for pagination
 */
export function useGetEpisodes(page?: number) {
  // Apollo Client's useQuery will use the endpoint from the ApolloProvider at the app root.
  // This hook assumes the ApolloProvider is configured with RICK_AND_MORTY_GRAPHQL_ENDPOINT.
  return useQuery<EpisodesQueryData, EpisodesQueryVars>(GetEpisodesDocument as DocumentNode, {
    variables: { page },
    // No need to specify context.uri if the ApolloProvider is set up globally.
    // If needed, you can add context: { uri: RICK_AND_MORTY_GRAPHQL_ENDPOINT }
  });
}

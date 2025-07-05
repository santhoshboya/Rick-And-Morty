import { gql, useQuery } from "@apollo/client";

// Types for query variables and response
export type EpisodeDetailsQueryVars = {
  episodeId: string;
};

export type Character = {
  id: string;
  name: string;
  gender: string;
  status: string;
  image: string;
};

export type EpisodeDetails = {
  id: string;
  name: string;
  episode: string;
  created: string;
  air_date: string;
  characters: Character[];
};

export type EpisodeDetailsQueryData = {
  episode: EpisodeDetails;
};

export const GetEpisodeDetailsDocument = gql`
  query Episode($episodeId: ID!) {
    episode(id: $episodeId) {
      name
      id
      episode
      created
      air_date
      characters {
        gender
        id
        image
        status
        name
      }
    }
  }
`;

// Apollo hook to fetch episode details by ID
export function useGetEpisodeDetails(episodeId: string) {
  return useQuery<EpisodeDetailsQueryData, EpisodeDetailsQueryVars>(GetEpisodeDetailsDocument, {
    variables: { episodeId },
    skip: !episodeId,
  });
}

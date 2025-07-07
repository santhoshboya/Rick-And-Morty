import { gql, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

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

export function useGetEpisodes(page?: number) {
  return useQuery<EpisodesQueryData, EpisodesQueryVars>(GetEpisodesDocument as DocumentNode, {
    variables: { page },
  });
}

import { gql, useQuery } from '@apollo/client';

export const GetCharacterDetailsDocument = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      created
      gender
      id
      image
      location {
        created
        dimension
        id
        name
        type
      }
      name
      species
      status
      type
      episode {
        air_date
        created
        episode
        id
        name
      }
      origin {
        created
        dimension
        id
        name
        type
      }
    }
  }
`;

export type CharacterDetailsGQL = {
  created: string;
  gender: string;
  id: string;
  image: string;
  location: {
    created: string;
    dimension: string;
    id: string;
    name: string;
    type: string;
  };
  name: string;
  species: string;
  status: string;
  type: string;
  episode: {
    air_date: string;
    created: string;
    episode: string;
    id: string;
    name: string;
  }[];
  origin: {
    created: string;
    dimension: string;
    id: string;
    name: string;
    type: string;
  };
};

export type CharacterDetailsQueryData = {
  character: CharacterDetailsGQL;
};

export type CharacterDetailsQueryVars = {
  characterId: string;
};

export function useGetCharacterDetails(characterId: string) {
  return useQuery<CharacterDetailsQueryData, CharacterDetailsQueryVars>(GetCharacterDetailsDocument, {
    variables: { characterId },
    skip: !characterId,
  });
}

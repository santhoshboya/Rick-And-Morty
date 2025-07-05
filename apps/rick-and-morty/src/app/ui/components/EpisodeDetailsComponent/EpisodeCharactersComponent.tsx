import React from "react";
import { styles } from "./EpisodeCharactersComponentStyles";
import { Character } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";
import { CharacterComponent } from "./CharacterComponent";

interface EpisodeCharactersComponentProps {
  characters: Character[];
}

export const EpisodeCharactersComponent: React.FC<EpisodeCharactersComponentProps> = ({ characters }) => {
  if (!characters || characters.length === 0) return <div className={styles.empty}>No characters found for this episode.</div>;
  return (
    <div className={styles.charactersList}>
      {characters.map((character) => (
        <CharacterComponent key={character.id} character={character} />
      ))}
    </div>
  );
};

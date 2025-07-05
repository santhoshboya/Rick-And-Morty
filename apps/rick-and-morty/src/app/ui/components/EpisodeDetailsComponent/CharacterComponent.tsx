import React from "react";
import { styles } from "./CharacterComponentStyles";
import { Character } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";

interface CharacterComponentProps {
  character: Character;
}

export const CharacterComponent: React.FC<CharacterComponentProps> = ({ character }) => {
  return (
    <div className={styles.card}>
      <img src={character.image} alt={character.name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{character.name}</div>
        <div className={styles.meta}><span className={styles.label}>Gender:</span> {character.gender}</div>
        <div className={styles.meta}><span className={styles.label}>Status:</span> {character.status}</div>
      </div>
    </div>
  );
};

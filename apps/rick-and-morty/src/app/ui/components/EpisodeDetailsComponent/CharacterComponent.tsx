import React from "react";
import { styles } from "./CharacterComponentStyles";
import { Character } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";
import { useNavigate } from "react-router-dom";

interface CharacterComponentProps {
  character: Character;
}


export const CharacterComponent: React.FC<CharacterComponentProps> = ({ character }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/character/${character.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/character/${character.id}`); }}
    >
      <img src={character.image} alt={character.name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{character.name}</div>
        <div className={styles.meta}><span className={styles.label}>Gender:</span> {character.gender}</div>
        <div className={styles.meta}><span className={styles.label}>Status:</span> {character.status}</div>
      </div>
    </div>
  );
};

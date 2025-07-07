import React from "react";
import { useTranslation } from 'react-i18next';

import { Character } from "../../../data-access/stores/EpisodeDetailsStore";
import { CharacterComponent } from "../CharacterComponent/CharacterComponent";
import { styles } from "./Styles";

interface EpisodeCharactersComponentProps {
  characters: Character[];
}

export const EpisodeCharactersComponent: React.FC<EpisodeCharactersComponentProps> = ({ characters }) => {
  const { t } = useTranslation();
  if (!characters || characters.length === 0) return <div className={styles.empty}>{t('characterDetails.noCharacters')}</div>;
  return (
    <div className={styles.charactersList}>
      {characters.map((character) => (
        <CharacterComponent key={character.id} character={character} />
      ))}
    </div>
  );
};

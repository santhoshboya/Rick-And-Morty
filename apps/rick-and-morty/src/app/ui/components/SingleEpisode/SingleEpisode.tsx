import React from "react";
import { useTranslation } from 'react-i18next';

import { styles } from "./Styles";

export interface SingleEpisodeProps {
  name: string;
  episode: string;
  created: string;
  onClick?: (episode: SingleEpisodeProps) => void;
}

export const SingleEpisode: React.FC<SingleEpisodeProps> = ({ name, episode, created, onClick }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.episodeCard} onClick={() => onClick?.({ name, episode, created })} tabIndex={0} role="button" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick?.({ name, episode, created }); }}>
      <div className={styles.headerRow}>
        <span className={styles.episodeEnum}>{episode}</span>
        <span className={styles.episodeName}>{name}</span>
      </div>
      <div className={styles.createdDate}>
        {t('episodes.created')}{new Date(created).toLocaleDateString()}
      </div>
    </div>
  );
};

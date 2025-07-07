import React from "react";
import { useTranslation } from 'react-i18next';

import { styles } from "./EpisodeInfoComponentStyles";

interface EpisodeInfoComponentProps {
  episode?: {
    name?: string;
    episode?: string;
    air_date?: string;
    created?: string;
    id?: string;
  };
}

export const EpisodeInfoComponent: React.FC<EpisodeInfoComponentProps> = ({ episode }) => {
  const { t } = useTranslation();
  if (!episode) return null;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.row}><span className={styles.label}>{t('characterDetails.name')}</span> {episode.name}</div>
      <div className={styles.row}><span className={styles.label}>{t('characterDetails.code')}</span> {episode.episode}</div>
      <div className={styles.row}><span className={styles.label}>{t('characterDetails.airDate')}</span> {episode.air_date}</div>
      <div className={styles.row}><span className={styles.label}>{t('episodes.created')}</span> {episode.created}</div>
      <div className={styles.row}><span className={styles.label}>{t('characterDetails.id')}</span> {episode.id}</div>
    </div>
  );
};

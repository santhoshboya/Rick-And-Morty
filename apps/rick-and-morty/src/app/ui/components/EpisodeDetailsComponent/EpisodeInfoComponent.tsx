import React from "react";
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
  if (!episode) return null;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.row}><span className={styles.label}>Name:</span> {episode.name}</div>
      <div className={styles.row}><span className={styles.label}>Code:</span> {episode.episode}</div>
      <div className={styles.row}><span className={styles.label}>Air Date:</span> {episode.air_date}</div>
      <div className={styles.row}><span className={styles.label}>Created:</span> {episode.created}</div>
      <div className={styles.row}><span className={styles.label}>ID:</span> {episode.id}</div>
    </div>
  );
};

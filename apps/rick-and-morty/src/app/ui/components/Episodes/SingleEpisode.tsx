import React from "react";
import { styles } from "./Styles";

export interface SingleEpisodeProps {
  name: string;
  episode: string; // e.g., S05E08
  created: string; // ISO string
}

export const SingleEpisode: React.FC<SingleEpisodeProps> = ({ name, episode, created }) => {
  return (
    <div className={styles.episodeCard}>
      <div className={styles.headerRow}>
        <span className={styles.episodeEnum}>{episode}</span>
        <span className={styles.episodeName}>{name}</span>
      </div>
      <div className={styles.createdDate}>
        Created: {new Date(created).toLocaleDateString()}
      </div>
    </div>
  );
};

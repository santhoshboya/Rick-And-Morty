import React from "react";
import { styles } from "./Styles";

export interface SingleEpisodeProps {
  name: string;
  episode: string; // e.g., S05E08
  created: string; // ISO string
  onClick?: (episode: SingleEpisodeProps) => void;
}

export const SingleEpisode: React.FC<SingleEpisodeProps> = ({ name, episode, created, onClick }) => {
  return (
    <div className={styles.episodeCard} onClick={(event) => onClick?.({ name, episode, created })} style={{ cursor: 'pointer' }}>
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

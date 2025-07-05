import React, { useRef, useCallback } from "react";
import { SingleEpisode, SingleEpisodeProps } from "./SingleEpisode";
import { styles } from "./Styles";

interface EpisodesListComponentProps {
  episodes: SingleEpisodeProps[];
  loading: boolean;
  error?: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const EpisodesListComponent: React.FC<EpisodesListComponentProps> = ({
  episodes,
  loading,
  error,
  hasMore,
  onLoadMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastEpisodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Rick and Morty Episodes</h2>
      <div className={styles.listContainer}>
        {episodes.map((ep, idx) => {
          if (idx === episodes.length - 1) {
            return (
              <div ref={lastEpisodeRef} key={ep.episode}>
                <SingleEpisode {...ep} />
              </div>
            );
          }
          return <SingleEpisode key={ep.episode} {...ep} />;
        })}
        {loading && <div className={styles.loading}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

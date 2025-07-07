import React, { useRef, useCallback } from "react";
import { useTranslation } from 'react-i18next';

import { styles } from "./Styles";
import { SingleEpisode, SingleEpisodeProps } from "./SingleEpisode";

interface EpisodesListComponentProps {
  episodes: SingleEpisodeProps[];
  loading: boolean;
  error?: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onEpisodeClick: (episode: SingleEpisodeProps) => void;
}

export const EpisodesListComponent: React.FC<EpisodesListComponentProps> = ({
  episodes,
  loading,
  error,
  hasMore,
  onLoadMore,
  onEpisodeClick,
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

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t('episodes.title')}</h2>
      <div className={styles.listContainer}>
        {episodes.map((ep, idx) => {
          if (idx === episodes.length - 1) {
            return (
              <div ref={lastEpisodeRef} key={ep.episode}>
                <SingleEpisode {...ep} onClick={onEpisodeClick} />
              </div>
            );
          }
          return <SingleEpisode key={ep.episode} {...ep} onClick={onEpisodeClick} />;
        })}
        {loading && <div className={styles.loading}>{t('common.loading')}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

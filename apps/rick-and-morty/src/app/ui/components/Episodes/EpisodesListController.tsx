import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useGetEpisodes } from "../../../data-access/apis/GetEpisodes/useGetEpisodes";
import { EpisodesListComponent } from "./EpisodesListComponent";
import { EpisodesStore } from "../../../data-access/store/episodes/EpisodesStore";
import { EpisodeModel } from "../../../data-access/store/episodes/EpisodeModel";

// Instantiate the store (in real apps, provide via context or DI)
const episodesStore = new EpisodesStore();

export const EpisodesListController: React.FC = observer(() => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetEpisodes(page);

  // When data changes, update store
  useEffect(() => {
    if (data && data.episodes) {
      if (page === 1) {
        episodesStore.setEpisodes(data.episodes.results as EpisodeModel[], data.episodes.info);
      } else {
        episodesStore.appendEpisodes(data.episodes.results as EpisodeModel[], data.episodes.info);
      }
    }
    episodesStore.setLoading(loading);
    episodesStore.setError(error?.message || null);
  }, [data, loading, error, page]);

  const handleLoadMore = useCallback(() => {
    if (
      !episodesStore.episodesLoading &&
      episodesStore.episodeInfo &&
      episodesStore.episodeInfo.next
    ) {
      setPage(episodesStore.episodeInfo.next);
    }
  }, [episodesStore.episodesLoading, episodesStore.episodeInfo]);

  return (
    <EpisodesListComponent
      episodes={episodesStore.episodes.map((ep) => ({
        name: ep.name,
        episode: ep.episode,
        created: ep.created,
      }))}
      loading={episodesStore.episodesLoading}
      error={episodesStore.episodedError}
      hasMore={!!(episodesStore.episodeInfo && episodesStore.episodeInfo.next)}
      onLoadMore={handleLoadMore}
    />
  );
});

import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useGetEpisodes } from "../../../data-access/apis/GetEpisodes/useGetEpisodes";
import { EpisodesListComponent } from "./EpisodesListComponent";
import { EpisodeModel } from "../../../data-access/store/episodes/EpisodeModel";
import { EpisodeDetailsController } from "../EpisodeDetailsComponent/EpisodeDetailsController";

import { useEpisodesStore } from '../../../data-access/StoreProvider/EpisodesContext';

export const EpisodesListController: React.FC = observer(() => {
  const episodesStore = useEpisodesStore();
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);

  const handleEpisodeClick = (episode: { name: string; episode: string; created: string }) => {
    // Find the full episode model from the store for future data needs
    const fullEpisode = episodesStore.episodes.find(
      (ep) => ep.episode === episode.episode && ep.name === episode.name
    );
    setSelectedEpisodeId(fullEpisode?.id || null);
    setModalOpen(true);
  };

  return (
    <>
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
        onEpisodeClick={handleEpisodeClick}
      />
      <EpisodeDetailsController
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        episodeId={selectedEpisodeId}
      />
    </>
  );
});

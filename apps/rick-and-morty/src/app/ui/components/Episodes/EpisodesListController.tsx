import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useGetEpisodes } from "../../../data-access/apis/GetEpisodes/useGetEpisodes";
import { EpisodesListComponent } from "./EpisodesListComponent";
import { EpisodeModel } from "../../../data-access/store/episodes/EpisodeModel";
import { EpisodeDetailsController } from "../EpisodeDetailsComponent/EpisodeDetailsController";

import { useEpisodesStore } from '../../../data-access/StoreProvider/EpisodesContext';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodesListController: React.FC = observer(() => {
  const episodesStore = useEpisodesStore();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetEpisodes(page);

  const navigate = useNavigate();
  const params = useParams();
  const episodeIdFromUrl = params.id || null;
  const tabIdFromUrl = params.tabId || 'info'; // default to 'info' tab

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>(tabIdFromUrl);

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
  }, [data, loading, error, page, episodesStore]);

  const handleLoadMore = useCallback(() => {
    if (
      !episodesStore.episodesLoading &&
      episodesStore.episodeInfo &&
      episodesStore.episodeInfo.next
    ) {
      setPage(episodesStore.episodeInfo.next);
    }
  }, [episodesStore.episodesLoading, episodesStore.episodeInfo]);

  // Modal state sync with URL
  React.useEffect(() => {
    if (episodeIdFromUrl) {
      setSelectedEpisodeId(episodeIdFromUrl);
      setModalOpen(true);
      setActiveTabId(tabIdFromUrl);
    } else {
      setModalOpen(false);
      setSelectedEpisodeId(null);
      setActiveTabId('info');
    }
  }, [episodeIdFromUrl, tabIdFromUrl]);

  const handleEpisodeClick = (episode: { name: string; episode: string; created: string }) => {
    // Find the full episode model from the store for future data needs
    const fullEpisode = episodesStore.episodes.find(
      (ep) => ep.episode === episode.episode && ep.name === episode.name
    );
    if (fullEpisode?.id) {
      navigate(`/episodes/${fullEpisode.id}/${activeTabId}`);
    }
  };

  // When tab changes in modal, update URL
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (selectedEpisodeId) {
      navigate(`/episodes/${selectedEpisodeId}/${tabId}`);
    }
  };


  const handleModalClose = () => {
    navigate('/episodes');
  };

  // Handler to redirect to episodes list on invalid id (to be passed to EpisodeDetailsController)
  const handleInvalidEpisode = React.useCallback(() => {
    navigate('/episodes', { replace: true });
  }, [navigate]);

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
        onClose={handleModalClose}
        episodeId={selectedEpisodeId}
        tabId={activeTabId}
        onTabChange={handleTabChange}
        onInvalidEpisode={handleInvalidEpisode}
      />
    </>
  );
});

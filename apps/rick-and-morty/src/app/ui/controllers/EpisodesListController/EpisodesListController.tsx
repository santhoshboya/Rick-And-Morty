import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';

import { useGetEpisodes } from "../../../data-access/apis/GetEpisodes/GetEpisodes";
import { useEpisodesStore } from '../../../data-access/StoreProvider/EpisodesContext';
import { EpisodesListComponent } from "../../components/EpisodesList/EpisodesListComponent";
import { EpisodeModel } from "../../../data-access/models/EpisodeModel/EpisodeModel";

export const EpisodesListController: React.FC = observer(() => {
  const episodesStore = useEpisodesStore();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetEpisodes(page);

  const navigate = useNavigate();
  const params = useParams();
  const episodeIdFromUrl = params.id || null;
  const tabIdFromUrl = params.tabId || 'info'; // default to 'info' tab

  const [activeTabId, setActiveTabId] = useState<string>(tabIdFromUrl);

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

  React.useEffect(() => {
    if (episodeIdFromUrl) {
      setActiveTabId(tabIdFromUrl);
    }
  }, [episodeIdFromUrl, tabIdFromUrl]);

  const handleEpisodeClick = (episode: { name: string; episode: string; created: string }) => {
    const fullEpisode = episodesStore.episodes.find(
      (ep: EpisodeModel) => ep.episode === episode.episode && ep.name === episode.name
    );
    if (fullEpisode?.id) {
      navigate(`/episodes/${fullEpisode.id}/${activeTabId}`);
    }
  };

  return (
    <EpisodesListComponent
      episodes={episodesStore.episodes}
      loading={episodesStore.episodesLoading}
      error={episodesStore.episodedError}
      onLoadMore={handleLoadMore}
      onEpisodeClick={handleEpisodeClick}
      hasMore={episodesStore.episodeInfo?.next !== null}
    />
  );
});

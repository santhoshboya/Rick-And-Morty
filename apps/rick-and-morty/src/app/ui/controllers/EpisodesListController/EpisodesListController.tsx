import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';

import { useGetEpisodes } from "../../../data-access/apis/GetEpisodes/GetEpisodes";
import { useEpisodesStore } from '../../../data-access/StoreProvider/EpisodesContext';
import { EpisodeModel } from "../../../data-access/models/EpisodeModel/EpisodeModel";
import { ROUTE_EPISODES, ROUTE_EPISODE_DETAILS_TAB } from '../../constants/RoutePaths';
import { TAB_KEYS, TabId } from '../../constants/Constants';
import { EpisodeDetailsController } from "../EpisodeDetailsController/EpisodeDetailsController";
import { EpisodesListComponent } from "../../components/EpisodesList/EpisodesListComponent";

const EpisodesListController: React.FC = observer(() => {
  const episodesStore = useEpisodesStore();
  const [page, setPage] = useState(1);
  const [getEpisodes, { data, loading, error }] = useGetEpisodes();

  useEffect(() => {
    getEpisodes({ variables: { page } });
  }, [getEpisodes, page]);

  const navigate = useNavigate();
  const params = useParams();
  const selectedEpisodeId = params.id || null;
  const activeTabId: TabId = (params.tabId as TabId) || TAB_KEYS[0];
  const modalOpen = Boolean(selectedEpisodeId);

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
      episodesStore.episodesLoading === false &&
      episodesStore.episodeInfo &&
      episodesStore.episodeInfo.next
    ) {
      setPage(episodesStore.episodeInfo.next);
    }
  }, [episodesStore.episodesLoading, episodesStore.episodeInfo]);

  const handleEpisodeClick = (episode: { name: string; episode: string; created: string }) => {
    const fullEpisode = episodesStore.episodes.find(
      (ep) => ep.episode === episode.episode && ep.name === episode.name
    );
    if (fullEpisode?.id) {
      navigate(ROUTE_EPISODE_DETAILS_TAB(fullEpisode.id, activeTabId));
    }
  };

  const handleTabChange = (tabId: string) => {
    if (selectedEpisodeId) {
      navigate(ROUTE_EPISODE_DETAILS_TAB(selectedEpisodeId, tabId));
    }
  };

  const handleModalClose = () => {
    navigate(ROUTE_EPISODES);
  };

  const handleInvalidEpisode = useCallback(() => {
    navigate(ROUTE_EPISODES, { replace: true });
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
        hasMore={(episodesStore.episodeInfo && episodesStore.episodeInfo.next) ? true : false}
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

export default EpisodesListController;
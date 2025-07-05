import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useGetEpisodeDetails } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";
import { useEpisodeDetailsStore } from "../../../data-access/StoreProvider/EpisodeDetailsContext";
import { EpisodeDetailsComponent } from "../../components/EpisodeDetailsComponent/EpisodeDetailsComponent";

interface EpisodeDetailsControllerProps {
  open: boolean;
  onClose: () => void;
  episodeId?: string | null;
  tabId?: string;
  onTabChange?: (tabId: string) => void;
  onInvalidEpisode?: () => void;
}

export const EpisodeDetailsController: React.FC<EpisodeDetailsControllerProps> = observer(({ open, onClose, episodeId, tabId, onTabChange, onInvalidEpisode }) => {
  const store = useEpisodeDetailsStore();
  const { data, loading, error } = useGetEpisodeDetails(episodeId || "");

  // Sync store with query state
  useEffect(() => {
    store.setLoading(loading);
    store.setError(error?.message || null);
    if (data?.episode) {
      store.setEpisodeDetails(data.episode);
      store.setCharacters(data.episode.characters);
    }
    if (!episodeId) {
      store.clearDetails();
    }
  }, [data, loading, error, episodeId, store]);

  // Redirect on invalid episode id
  useEffect(() => {
    if (!loading && error && typeof onInvalidEpisode === 'function') {
      onInvalidEpisode();
    }
  }, [loading, error, onInvalidEpisode]);

  return (
    <EpisodeDetailsComponent
      open={open}
      onClose={onClose}
      episode={store.episodeDetails}
      loading={store.loading}
      error={store.error}
      characters={store.characters}
      tabId={tabId as 'info' | 'characters'}
      onTabChange={onTabChange}
    />
  );
});

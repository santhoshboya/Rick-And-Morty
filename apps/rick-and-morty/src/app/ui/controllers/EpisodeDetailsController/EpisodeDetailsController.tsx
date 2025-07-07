import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useGetEpisodeDetails } from "../../../data-access/apis/GetEpisodeDetails/GetEpisodeDetails";
import { useEpisodeDetailsStore } from "../../../data-access/StoreProvider/EpisodeDetailsContext";
import { EpisodeDetailsComponent } from "../../components/EpisodeDetailsComponent/EpisodeDetailsComponent";
import { TabId } from "../../constants/Constants";

interface EpisodeDetailsControllerProps {
  open: boolean;
  onClose: () => void;
  episodeId?: string | null;
  tabId: TabId;
  onTabChange: (tabId: TabId) => void;
  onInvalidEpisode: () => void;
}

export const EpisodeDetailsController: React.FC<EpisodeDetailsControllerProps> = observer(({ open, onClose, episodeId, tabId, onTabChange, onInvalidEpisode }) => {
  const store = useEpisodeDetailsStore();
  const { data, loading, error } = useGetEpisodeDetails(episodeId || "");

  useEffect(() => {
    store.setLoading(loading);
    store.setError(error?.message || null);
    if (data?.episode) {
      store.setEpisodeDetails({
        id: data.episode.id,
        name: data.episode.name,
        episode: data.episode.episode,
        created: data.episode.created,
        airDate: data.episode.air_date,
      });
      store.setCharacters(data.episode.characters);
    }
    if (episodeId === null) {
      store.clearDetails();
    }
  }, [data, loading, error, episodeId, store]);

  useEffect(() => {
    if (loading === false && error && onInvalidEpisode) {
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
      tabId={tabId}
      onTabChange={onTabChange}
    />
  );
});

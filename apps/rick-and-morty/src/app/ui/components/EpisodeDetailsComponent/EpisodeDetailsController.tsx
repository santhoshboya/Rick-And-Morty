import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useGetEpisodeDetails } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";
import { useEpisodeDetailsStore } from "../../../data-access/StoreProvider/EpisodeDetailsContext";
import { EpisodeDetailsComponent } from "./EpisodeDetailsComponent";

interface EpisodeDetailsControllerProps {
  open: boolean;
  onClose: () => void;
  episodeId?: string | null;
}

export const EpisodeDetailsController: React.FC<EpisodeDetailsControllerProps> = observer(({ open, onClose, episodeId }) => {
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

  return (
    <EpisodeDetailsComponent
      open={open}
      onClose={onClose}
      episode={store.episodeDetails}
      loading={store.loading}
      error={store.error}
      characters={store.characters}
    />
  );
});

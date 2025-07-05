import { makeAutoObservable } from "mobx";
import { EpisodeModel } from "./EpisodeModel";
import { EpisodeInfoModel } from "./EpisodeInfoModel";

export class EpisodesStore {
  episodes: EpisodeModel[] = [];
  episodeInfo: EpisodeInfoModel | null = null;
  episodesLoading = false;
  episodedError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setEpisodes(episodes: EpisodeModel[], info: EpisodeInfoModel) {
    this.episodes = episodes;
    this.episodeInfo = info;
  }

  appendEpisodes(episodes: EpisodeModel[], info: EpisodeInfoModel) {
    this.episodes = [...this.episodes, ...episodes];
    this.episodeInfo = info;
  }

  setLoading(loading: boolean) {
    this.episodesLoading = loading;
  }

  setError(error: string | null) {
    this.episodedError = error;
  }

  reset() {
    this.episodes = [];
    this.episodeInfo = null;
    this.episodesLoading = false;
    this.episodedError = null;
  }
}

// Usage in a React component:
// const store = new EpisodesStore();
// const { data, loading, error } = useGetEpisodes(page);
// useEffect(() => {
//   if (data) store.appendEpisodes(data.episodes.results, data.episodes.info);
//   store.setLoading(loading);
//   store.setError(error?.message || null);
// }, [data, loading, error]);


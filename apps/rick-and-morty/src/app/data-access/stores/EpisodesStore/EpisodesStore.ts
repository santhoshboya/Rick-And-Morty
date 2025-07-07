import { makeAutoObservable } from "mobx";
import { EpisodeInfoModel } from "../../models/EpisodeInfoModel/EpisodeInfoModel";
import { EpisodeModel } from "../../models/EpisodeModel/EpisodeModel";

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

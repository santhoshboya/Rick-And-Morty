import { makeAutoObservable } from "mobx";

export interface Character {
  id: string;
  name: string;
  gender: string;
  status: string;
  image: string;
}

export interface EpisodeDetails {
  id: string;
  name: string;
  episode: string;
  created: string;
  airDate: string;
}

export class EpisodeDetailsStore {
  episodeDetails: EpisodeDetails | null = null;
  characters: Character[] = [];
  loading = false;
  error: string | null = null;
  selectedEpisodeId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setEpisodeId(id: string) {
    this.selectedEpisodeId = id;
  }

  clearDetails() {
    this.episodeDetails = null;
    this.characters = [];
    this.loading = false;
    this.error = null;
    this.selectedEpisodeId = null;
  }

  setEpisodeDetails(details: EpisodeDetails) {
    this.episodeDetails = details;
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }
}

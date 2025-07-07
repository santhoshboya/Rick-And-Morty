import { makeAutoObservable } from 'mobx';

export interface Location {
  created: string;
  dimension: string;
  id: string;
  name: string;
  type: string;
}
export interface Episode {
  air_date: string;
  created: string;
  episode: string;
  id: string;
  name: string;
}

export interface CharacterDetails {
  created: string;
  gender: string;
  id: string;
  image: string;
  location: Location;
  name: string;
  species: string;
  status: string;
  type: string;
  episode: Episode[];
  origin: Location;
}

export class CharacterDetailsStore {
  character: CharacterDetails | null = null;
  loading = false;
  error: string | null = null;
  selectedCharacterId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCharacterId(id: string) {
    this.selectedCharacterId = id;
  }

  clearDetails() {
    this.character = null;
    this.loading = false;
    this.error = null;
    this.selectedCharacterId = null;
  }

  setCharacter(details: CharacterDetails) {
    this.character = details;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }
}

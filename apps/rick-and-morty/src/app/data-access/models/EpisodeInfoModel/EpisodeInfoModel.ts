// Model for episode pagination info
export interface EpisodeInfoModel {
  count: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

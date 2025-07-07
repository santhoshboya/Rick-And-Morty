// Constants for EpisodeDetailsComponent

export const TAB_KEYS = ['info', 'characters'] as const;
export type TabId = typeof TAB_KEYS[number];
export const TAB_INDEX_MAP: Record<TabId, number> = { info: 0, characters: 1 };

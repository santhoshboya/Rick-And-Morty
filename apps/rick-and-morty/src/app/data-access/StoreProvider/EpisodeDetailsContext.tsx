import React, { createContext, useContext, ReactNode } from "react";
import { EpisodeDetailsStore } from "../stores/EpisodeDetailsStore";

const EpisodeDetailsContext = createContext<EpisodeDetailsStore | null>(null);

export const EpisodeDetailsProvider = ({ children }: { children: ReactNode }) => {
  const store = React.useMemo(() => new EpisodeDetailsStore(), []);
  return (
    <EpisodeDetailsContext.Provider value={store}>
      {children}
    </EpisodeDetailsContext.Provider>
  );
};

export function useEpisodeDetailsStore() {
  const ctx = useContext(EpisodeDetailsContext);
  if (!ctx) throw new Error("useEpisodeDetailsStore must be used within an EpisodeDetailsProvider");
  return ctx;
}

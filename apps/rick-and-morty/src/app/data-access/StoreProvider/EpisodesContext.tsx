import React, { createContext, useContext } from "react";
import { EpisodesStore } from "../store/episodes/EpisodesStore";

const EpisodesContext = createContext<EpisodesStore | null>(null);

export const EpisodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store] = React.useState(() => new EpisodesStore());
    return <EpisodesContext.Provider value={store}>{children}</EpisodesContext.Provider>;
};

export function useEpisodesStore() {
  const ctx = useContext(EpisodesContext);
  if (!ctx) throw new Error("useEpisodesStore must be used within an EpisodesProvider");
  return ctx;
}

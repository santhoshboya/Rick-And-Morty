import React, { createContext, useContext } from "react";
import { CharacterDetailsStore } from "../stores/CharacterDetailsStore/CharacterDetailsStore";

const CharacterDetailsContext = createContext<CharacterDetailsStore | null>(null);

export const CharacterDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store] = React.useState(() => new CharacterDetailsStore());
    return (
        <CharacterDetailsContext.Provider value={store}>
            {children}
        </CharacterDetailsContext.Provider>
    );
};

export function useCharacterDetailsStore() {
  const ctx = useContext(CharacterDetailsContext);
  if (!ctx) throw new Error("useCharacterDetailsStore must be used within a CharacterDetailsProvider");
  return ctx;
}

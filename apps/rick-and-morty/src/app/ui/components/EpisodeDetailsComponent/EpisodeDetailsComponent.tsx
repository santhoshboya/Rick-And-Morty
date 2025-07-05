import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { styles } from "./Style";
import { EpisodeInfoComponent } from "./EpisodeInfoComponent";
import { EpisodeCharactersComponent } from "./EpisodeCharactersComponent";
import { Character } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";

interface EpisodeDetailsComponentProps {
  open: boolean;
  onClose: () => void;
  episode?: any; // Accepts episode data, can be typed better later
  loading: boolean;
  error?: string | null;
  characters: Character[];
}

export const EpisodeDetailsComponent: React.FC<EpisodeDetailsComponentProps> = ({ open, onClose, episode, loading, error, characters }) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.modalOverlay}>
      <DialogPanel className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
          {loading ? (
            <div className={styles.loading}>Loading episode details...</div>
          ) : error ? (
            <div className={styles.error}>Error: {error}</div>
          ) : (
            <TabGroup>
              <TabList className={styles.tabsRow}>
                <Tab className={({ selected }) => selected ? styles.tabActive : styles.tab}>
                  Info
                </Tab>
                <Tab className={({ selected }) => selected ? styles.tabActive : styles.tab}>
                  Characters
                </Tab>
              </TabList>
              <TabPanels className={styles.tabContent}>
                <TabPanel>
                  <h2 className={styles.tabTitle}>Episode Info: {episode?.episode} - {episode?.name}</h2>
                  <EpisodeInfoComponent episode={episode} />
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                  <h2 className={styles.tabTitle}>Characters: {episode?.episode} - {episode?.name}</h2>
                  <EpisodeCharactersComponent characters={characters} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
        </DialogPanel>
      </Dialog>
  );
};

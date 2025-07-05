import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { styles } from "./Style";

interface EpisodeDetailsComponentProps {
  open: boolean;
  onClose: () => void;
  episode?: any; // Accepts episode data, can be typed better later
}

export const EpisodeDetailsComponent: React.FC<EpisodeDetailsComponentProps> = ({ open, onClose, episode }) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.modalOverlay}>
      <div className={styles.modalOverlay}>
        <DialogPanel className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
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
                <p>Dummy info content goes here.</p>
              </TabPanel>
              <TabPanel>
                <h2 className={styles.tabTitle}>Characters: {episode?.episode} - {episode?.name}</h2>
                <p>Dummy characters content goes here.</p>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

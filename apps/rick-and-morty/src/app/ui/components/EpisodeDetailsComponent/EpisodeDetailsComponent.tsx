import React from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { Character } from "../../../data-access/stores/EpisodeDetailsStore";
import { TAB_KEYS, TAB_INDEX_MAP, TabId } from "../../constants/constants";
import { EpisodeCharactersComponent } from "../EpisodeCharactersComponent/EpisodeCharactersComponent";
import { EpisodeInfoComponent } from "../EpisodeInfoComponent/EpisodeInfoComponent";
import { styles } from "./Styles";

interface EpisodeDetailsComponentProps {
  open: boolean;
  onClose: () => void;
  episode?: {
    id: string;
    name: string;
    episode: string;
    created: string;
    air_date: string;
    characters?: Character[];
  } | null;
  loading: boolean;
  error?: string | null;
  characters: Character[];
  tabId?: TabId;
  onTabChange?: (tabId: TabId) => void;
}

export const EpisodeDetailsComponent: React.FC<EpisodeDetailsComponentProps> = ({ open, onClose, episode, loading, error, characters, tabId = 'info', onTabChange }) => {
  const { t } = useTranslation();
  const initialIndex = TAB_INDEX_MAP[tabId] ?? 0;
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setSelectedIndex(TAB_INDEX_MAP[tabId] ?? 0);
  }, [tabId]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    if (onTabChange) {
      onTabChange(TAB_KEYS[index]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className={styles.modalOverlay}>
      <DialogPanel className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
          {loading ? (
            <div className={styles.loading}>{t('common.loading')} EpisodeDetails</div>
          ) : error ? (
            <div className={styles.error}>{t('episodeDetails.errorPrefix')} {error}</div>
          ) : (
            <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
              <TabList className={styles.tabsRow}>
                <Tab className={({ selected }) => selected ? styles.tabActive : styles.tab}>
                  {t('episodeDetails.tabs.info')}
                </Tab>
                <Tab className={({ selected }) => selected ? styles.tabActive : styles.tab}>
                  {t('episodeDetails.tabs.characters')}
                </Tab>
              </TabList>
              <TabPanels className={styles.tabContent}>
                <TabPanel>
                  <h2 className={styles.tabTitle}>{t('episodeDetails.episodeInfo', { code: episode?.episode, name: episode?.name })}</h2>
                  <EpisodeInfoComponent episode={episode ?? undefined} />
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                  <h2 className={styles.tabTitle}>{t('episodeDetails.charactersInfo', { code: episode?.episode, name: episode?.name })}</h2>
                  <EpisodeCharactersComponent characters={characters ?? []} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
        </DialogPanel>
      </Dialog>
  );
};

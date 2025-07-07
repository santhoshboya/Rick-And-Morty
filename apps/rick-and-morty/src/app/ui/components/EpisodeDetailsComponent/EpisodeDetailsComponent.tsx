import React from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { styles } from "./Style";
import { EpisodeInfoComponent } from "./EpisodeInfoComponent";
import { EpisodeCharactersComponent } from "./EpisodeCharactersComponent";
import { Character } from "../../../data-access/apis/GetEpisodeDetails/useGetEpisodeDetails";

type TabId = 'info' | 'characters';

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
  const tabIndexMap = React.useMemo(() => ({ info: 0, characters: 1 } as Record<TabId, number>), []);
  const tabKeys: TabId[] = ['info', 'characters'];
  const initialIndex = tabIndexMap[tabId] ?? 0;
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setSelectedIndex(tabIndexMap[tabId] ?? 0);
  }, [tabId, tabIndexMap]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    if (onTabChange) {
      onTabChange(tabKeys[index]);
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

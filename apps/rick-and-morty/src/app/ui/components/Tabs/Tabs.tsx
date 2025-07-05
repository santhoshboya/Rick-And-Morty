import React, { ReactNode } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { tabList, tab as tabStyle, tabPanels, tabPanel } from './Styles';

export interface TabsProps {
  tabs: { label: string; content: ReactNode }[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, className }) => (
  <TabGroup>
    <TabList className={`${tabList} ${className || ''}`}>
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          className={({ selected }) => tabStyle(selected)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
    <TabPanels className={tabPanels}>
      {tabs.map((tab) => (
        <TabPanel key={tab.label} className={tabPanel}>
          {tab.content}
        </TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
);

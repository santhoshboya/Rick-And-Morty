// Styles.tsx for Tabs
export const tabList = "flex space-x-1 rounded-xl bg-blue-900/20 p-1";
export const tab = (selected: boolean) =>
  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`;
export const tabPanels = "mt-2";
export const tabPanel = "rounded-xl bg-white p-3";

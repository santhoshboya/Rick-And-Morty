export const styles = {
  modalOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-200",
  modalContainer:
    "bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn",
  closeButton:
    "absolute top-2 right-3 text-2xl text-white hover:text-gray-400 focus:outline-none",
  tabsRow:
    "flex bg-neutral-900 rounded-full p-1 mb-6 shadow-md w-fit mx-auto",
  tab:
    "flex-1 px-6 py-2 rounded-full text-sm font-medium text-gray-300 transition-all duration-200 focus:outline-none hover:text-white hover:bg-neutral-800/50",
  tabActive:
    "flex-1 px-6 py-2 rounded-full text-sm font-semibold text-white bg-neutral-800 shadow-md transition-all duration-200 focus:outline-none",
  tabContent:
    "mt-4 min-h-[100px] text-gray-200",
  tabTitle:
    "text-lg font-bold mb-2 text-blue-400",
};

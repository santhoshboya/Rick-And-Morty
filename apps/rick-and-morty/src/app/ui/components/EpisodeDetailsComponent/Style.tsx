export const styles = {
  modalOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-200",
  modalContainer:
    "bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn",
  closeButton:
    "absolute top-2 right-3 text-2xl text-white hover:text-gray-400 focus:outline-none",
  tabsRow:
    "flex mb-4 border-b border-gray-700",
  tab:
    "flex-1 py-2 text-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-200",
  tabActive:
    "flex-1 py-2 text-center text-white border-b-2 border-blue-500 font-semibold cursor-pointer",
  tabContent:
    "mt-4 min-h-[100px] text-gray-200",
  tabTitle:
    "text-lg font-bold mb-2 text-blue-400",
};

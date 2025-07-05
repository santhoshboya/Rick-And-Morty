export const styles = {
  modalOverlay: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm",
  modalContainer: "bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[650px] p-0 relative border border-neutral-800 animate-fadeIn flex flex-col", 
  closeButton:
    "absolute top-4 right-4 text-3xl text-white hover:text-red-400 transition-colors duration-150 focus:outline-none z-10",
  tabsRow:
    "flex bg-neutral-900 shadow-lg rounded-full px-2 py-2 mt-8 mb-8 w-fit mx-auto space-x-2 border border-neutral-800",
  tab:
    "flex-1 px-10 py-2 rounded-full text-base font-bold text-white bg-transparent transition-all duration-200 focus:outline-none hover:bg-neutral-800 hover:text-white",
  tabActive:
    "flex-1 px-10 py-2 rounded-full text-base font-semibold text-white bg-neutral-800 shadow transition-all duration-200 focus:outline-none", 
  tabContent:
    "flex-1 h-full min-h-0 flex flex-col overflow-hidden px-8 pb-8 pt-2 text-gray-100", 
  tabTitle:
    "text-xl font-bold mb-4 text-white tracking-wide", 
  loading: "text-center text-blue-400 py-12 text-xl font-semibold",
  error: "text-center text-red-400 py-12 text-xl font-semibold",
  tabPanel: "flex flex-col flex-1 min-h-0 h-full",
};

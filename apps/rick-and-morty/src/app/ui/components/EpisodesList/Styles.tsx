export const styles = {
  episodeCard:
    "bg-neutral-900 shadow-lg rounded-lg p-4 mb-6 flex flex-col border border-neutral-800 hover:scale-105 hover:shadow-xl transition-transform duration-200 text-white",
  headerRow: "flex items-center justify-between mb-2 gap-2",
  episodeEnum: "font-mono text-base text-pink-500 font-bold mr-3 tracking-wide",
  episodeName: "text-xl font-bold text-white flex-1 truncate",
  createdDate: "text-xs text-neutral-400 mt-1",

  // List styles
  heading: "text-3xl md:text-4xl font-extrabold text-white mb-8 text-center tracking-tight drop-shadow-lg",
  listContainer: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto bg-neutral-950 bg-opacity-90 p-8 rounded-lg shadow-2xl",
  loading: "col-span-full text-center py-6 text-neutral-400 text-lg font-semibold animate-pulse",
  error: "col-span-full text-center py-6 text-red-400 text-lg font-semibold",
  container: "min-h-screen w-full bg-gradient-to-b from-black via-neutral-900 to-neutral-950 flex flex-col items-center justify-start py-12"
};
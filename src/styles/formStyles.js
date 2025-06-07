export const formBaseStyle =
  "w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2";

export const getFormBorderColor = (error) =>
  error ? "border-red-400" : "border-gray-300";

export const formVisualStyle =
  "bg-white/70 text-gray-800 placeholder:text-gray-400 focus:ring-gray-700";

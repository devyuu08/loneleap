export const baseButtonClasses =
  "flex items-center justify-center gap-2 font-semibold transition-all";

export const buttonVariants = {
  dark: "bg-black/80 text-white hover:bg-black hover:shadow-xl",
  light: "bg-[#6D8591] text-white hover:bg-[#4d5e66] hover:shadow-md",
  danger: "bg-rose-400/90 text-white hover:bg-rose-500 hover:shadow-md",
  outline:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:shadow",
  disabled: "bg-gray-400 text-white opacity-70 cursor-not-allowed",
};

export const sizeVariants = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

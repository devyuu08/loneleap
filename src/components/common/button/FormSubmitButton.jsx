// export default function FormSubmitButton({ isLoading, label }) {
//   return (
//     <button
//       type="submit"
//       disabled={isLoading}
//       className={`px-6 py-3 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm transition-all ${
//         isLoading
//           ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
//           : "bg-black/80 text-white hover:bg-black hover:shadow-xl"
//       }`}
//     >
//       {isLoading ? "저장 중..." : label}
//     </button>
//   );
// }

import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function FormSubmitButton({
  isLoading,
  label = "제출",
  fullWidth = true, // 기본은 꽉 찬 버튼
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={clsx(
        fullWidth ? "w-full" : "w-auto",
        "px-6 py-3 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-2",
        isLoading
          ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
          : "bg-black/80 text-white hover:bg-black hover:shadow-xl"
      )}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{isLoading ? "처리 중..." : label}</span>
    </button>
  );
}

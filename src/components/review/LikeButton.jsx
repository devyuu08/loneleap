import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { cn } from "@/utils/utils";
import React from "react";

/**
 * LikeButton
 * - 좋아요 버튼 컴포넌트 (카드형 / 상세형 UI 지원)
 * - 좋아요 여부에 따라 하트 아이콘 상태 전환
 * - 좋아요 수를 함께 표시
 * - variant prop으로 스타일 분기 (e.g., card, detail)
 * - aria-label로 접근성 지원
 */

function LikeButton({
  hasLiked,
  likesCount = 0,
  variant = "card",
  disabled = false,
  onClick,
}) {
  const BASE_CLASS = "flex items-center gap-1 transition-all";
  const DISABLED_CLASS = disabled ? "opacity-50 cursor-not-allowed" : "";

  // 카드용 vs 상세용 스타일 분기
  const VARIANT_CLASS =
    variant === "detail"
      ? "px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition"
      : "text-sm text-gray-500 hover:text-red-500 transition";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(BASE_CLASS, DISABLED_CLASS, VARIANT_CLASS)}
      aria-label={hasLiked ? "좋아요 취소" : "좋아요 누르기"}
    >
      {/* 하트 아이콘: 좋아요 여부에 따라 변경 */}
      {hasLiked ? (
        <AiFillHeart
          className={
            variant === "detail" ? "text-red-500 w-4 h-4" : "text-red-500"
          }
        />
      ) : (
        <AiOutlineHeart
          className={
            variant === "detail"
              ? "text-gray-400 hover:text-red-500 w-4 h-4"
              : "text-gray-400 hover:text-red-500"
          }
        />
      )}

      {/* 좋아요 수 */}
      <span className="font-medium">{likesCount}</span>
    </button>
  );
}

LikeButton.propTypes = {
  hasLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(LikeButton);

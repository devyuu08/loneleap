import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { cn } from "@/utils/utils";
import React from "react";

function LikeButton({
  hasLiked,
  likesCount = 0,
  variant = "card",
  disabled = false,
  onClick,
}) {
  const BASE_CLASS = "flex items-center gap-1 transition-all";
  const DISABLED_CLASS = disabled ? "opacity-50 cursor-not-allowed" : "";
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

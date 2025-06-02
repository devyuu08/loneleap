import React from "react";
import PropTypes from "prop-types";
import { Send, Image as ImageIcon } from "lucide-react";

const MessageInput = React.memo(function MessageInput({
  message,
  setMessage,
  handleSend,
  handleKeyDown,
  isSubmitting,
  inputRef,
}) {
  return (
    <div className="flex items-center gap-3">
      <button className="text-gray-500 hover:text-gray-700">
        <ImageIcon className="w-5 h-5" />
      </button>

      {/* 입력창 */}
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={isSubmitting}
        className="flex-1 bg-white/70 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300 shadow-sm"
        maxLength={500}
      />

      {/* 전송 버튼 */}
      <button
        onClick={handleSend}
        disabled={isSubmitting}
        aria-label="메시지 전송"
        className={`p-2 rounded-full text-white backdrop-blur-sm transition-all shadow-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed opacity-70"
            : "bg-black/80 hover:bg-black hover:shadow-xl"
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
});

MessageInput.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

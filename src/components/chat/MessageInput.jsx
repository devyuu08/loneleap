import React from "react";
import PropTypes from "prop-types";
import { Send, Image as ImageIcon } from "lucide-react";

function MessageInput({
  message,
  setMessage,
  handleSend,
  handleKeyDown,
  isSubmitting,
  inputRef,
}) {
  const CHAT_INPUT =
    "flex-1 bg-white/70 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300 shadow-sm";

  const SEND_BUTTON =
    "p-2 rounded-full text-white backdrop-blur-sm transition-all shadow-md";

  const DISABLED_SEND_BUTTON = "bg-gray-400 cursor-not-allowed opacity-70";

  const ACTIVE_SEND_BUTTON = "bg-black/80 hover:bg-black hover:shadow-xl";

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
        className={CHAT_INPUT}
        maxLength={500}
      />

      {/* 전송 버튼 */}
      <button
        onClick={handleSend}
        disabled={isSubmitting}
        aria-label="메시지 전송"
        className={`${SEND_BUTTON} ${
          isSubmitting ? DISABLED_SEND_BUTTON : ACTIVE_SEND_BUTTON
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

MessageInput.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default React.memo(MessageInput);

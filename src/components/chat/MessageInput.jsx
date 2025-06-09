import React from "react";
import PropTypes from "prop-types";
import { Send, Image as ImageIcon } from "lucide-react";

/**
 * 채팅 입력창 컴포넌트
 * - 텍스트 입력 필드와 전송 버튼 제공
 * - 전송 중일 때 비활성화 처리
 */

function MessageInput({
  message,
  setMessage,
  handleSend,
  handleKeyDown,
  isSubmitting,
  inputRef,
}) {
  const chatInput =
    "flex-1 bg-white/70 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300 shadow-sm";

  const sendButton =
    "p-2 rounded-full text-white backdrop-blur-sm transition-all shadow-md";

  const disabledSendButton = "bg-gray-400 cursor-not-allowed opacity-70";

  const activeSendButton = "bg-black/80 hover:bg-black hover:shadow-xl";

  return (
    <div className="flex items-center gap-3">
      {/* 이미지 업로드 버튼 (미구현 상태) */}
      <button
        className="text-gray-500 hover:text-gray-700"
        aria-label="이미지 전송"
      >
        <ImageIcon className="w-5 h-5" />
      </button>

      {/* 텍스트 입력 필드 */}
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={isSubmitting}
        className={chatInput}
        maxLength={500}
      />

      {/* 메시지 전송 버튼 */}
      <button
        onClick={handleSend}
        disabled={isSubmitting}
        aria-label="메시지 전송"
        className={`${sendButton} ${
          isSubmitting ? disabledSendButton : activeSendButton
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

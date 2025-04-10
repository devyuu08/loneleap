// src/components/chat/ChatMessage.jsx
import { useSelector } from "react-redux";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";

export default function ChatMessage({ message }) {
  const user = useSelector((state) => state.user.user);
  const isMine = message.senderId === user?.uid;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-xs">
        {!isMine && (
          <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
        )}

        <div
          className={`px-4 py-2 rounded-xl text-sm ${
            isMine
              ? "bg-gray-900 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {message.message}
        </div>

        <p className="text-[10px] text-gray-400 mt-1 text-right">
          {message.createdAt?.toDate
            ? formatRelative(message.createdAt.toDate(), new Date(), {
                locale: ko,
              })
            : ""}
        </p>
      </div>
    </div>
  );
}

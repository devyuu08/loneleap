// src/pages/chat/CreateChatRoomPage.jsx
import ChatRoomForm from "components/chat/ChatRoomForm";

export default function CreateChatRoomPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md px-6 py-8">
        <ChatRoomForm />
      </div>
    </div>
  );
}

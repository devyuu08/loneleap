// pages/chat/Detail.jsx
import { useParams } from "react-router-dom";
import ChatRoomDetail from "components/chat/ChatRoomDetail";

export default function ChatRoomDetailPage() {
  const { id } = useParams();
  return <ChatRoomDetail roomId={id} />;
}

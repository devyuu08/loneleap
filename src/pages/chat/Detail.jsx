import { useParams } from "react-router-dom";
import ChatRoomDetailContainer from "@/containers/chat/ChatRoomDetailContainer";

export default function ChatRoomDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <div>유효하지 않은 채팅방 ID입니다.</div>;
  }

  return <ChatRoomDetailContainer roomId={id} />;
}

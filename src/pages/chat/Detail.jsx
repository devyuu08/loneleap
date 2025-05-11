/**
+  * 채팅방 상세 페이지 컴포넌트
+  * URL 매개변수에서 채팅방 ID를 추출하여 ChatRoomDetail 컴포넌트에 전달합니다.
+  */
import { useParams } from "react-router-dom";
import ChatRoomDetail from "components/chat/ChatRoomDetail";

export default function ChatRoomDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <div>유효하지 않은 채팅방 ID입니다.</div>;
  }

  return <ChatRoomDetail roomId={id} />;
}

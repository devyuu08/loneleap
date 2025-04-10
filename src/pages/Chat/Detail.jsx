// pages/chat/Detail.jsx

/**
+  * 채팅방 상세 페이지 컴포넌트
+  * URL 매개변수에서 채팅방 ID를 추출하여 ChatRoomDetail 컴포넌트에 전달합니다.
+  */
import { useParams } from "react-router-dom";
import ChatRoomDetail from "components/chat/ChatRoomDetail";

export default function ChatRoomDetailPage() {
  const { id } = useParams();
  return <ChatRoomDetail roomId={id} />;
}

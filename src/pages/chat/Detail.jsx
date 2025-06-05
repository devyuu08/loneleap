import { useParams } from "react-router-dom";
import ChatRoomDetailContainer from "@/containers/chat/ChatRoomDetailContainer";

export default function ChatRoomDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <div>유효하지 않은 채팅방 ID입니다.</div>;
  }

  return (
    <>
      {/* 모바일에서는 안내 문구만 */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-screen md:hidden">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          이 페이지는 PC 환경에서만 이용할 수 있어요.
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          더 넓은 화면에서 채팅 기능을 원활하게 사용하실 수 있도록
          <br />
          PC 또는 태블릿 환경에서 접속해 주세요.
        </p>
      </div>

      {/* PC에서는 정상 컴포넌트 렌더링 */}
      <div className="hidden md:block">
        <ChatRoomDetailContainer roomId={id} />
      </div>
    </>
  );
}

import ChatRoomCard from "@/components/chat/ChatRoomCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import { MessageSquare } from "lucide-react";
import HeroWithFilterSearch from "@/components/common/layout/HeroWithFilterSearch";
import { useCallback } from "react";

const CHATROOM_FILTERS = ["전체", "동행", "정보"];

export default function ChatRoomList({
  chatrooms,
  filteredRooms,
  activeFilter,
  setActiveFilter,
  searchKeyword,
  setSearchKeyword,
  onCreate,
}) {
  const handleCreateClick = useCallback(() => {
    onCreate();
  }, [onCreate]);

  return (
    <>
      <HeroWithFilterSearch
        imageSrc="/images/chat-list-hero.jpg"
        title="함께 떠나는 대화, 여행의 또 다른 시작"
        subtitle="여행 정보를 공유하고, 동행자를 만나보세요."
        countLabel="채팅방"
        count={chatrooms?.length || 0}
        filters={CHATROOM_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder="채팅방 제목으로 검색"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {filteredRooms.length === 0 ? (
          <EmptyState
            icon={<MessageSquare className="w-8 h-8 text-gray-500" />}
            title="조건에 맞는 채팅방이 없습니다."
            description="필터나 검색어를 변경해보세요!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRooms.map((room) => (
              <ChatRoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
      <button
        className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-black text-white text-sm font-medium rounded-full shadow-lg hover:bg-gray-800 transition"
        onClick={handleCreateClick}
        aria-label="새 채팅방 만들기"
      >
        + 새 채팅방
      </button>
    </>
  );
}

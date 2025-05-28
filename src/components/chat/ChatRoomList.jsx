import ChatRoomCard from "@/components/chat/ChatRoomCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import HeroSection from "@/components/common/layout/HeroSection";
import { Search, MessageSquare } from "lucide-react";

export default function ChatRoomList({
  chatrooms,
  filteredRooms,
  activeFilter,
  setActiveFilter,
  searchKeyword,
  setSearchKeyword,
  onCreate,
}) {
  return (
    <>
      <HeroSection imageSrc="/images/chat-list-hero.jpg" align="center">
        {/* 텍스트 그룹 */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold drop-shadow">
            함께 떠나는 대화, 여행의 또 다른 시작
          </h2>
          <p className="text-sm text-white/90">
            여행 정보를 공유하고, 동행자를 만나보세요.
          </p>
          <p className="text-xs text-white/60">
            총 {chatrooms?.length || 0}개의 채팅방
          </p>
        </div>

        {/* 필터 + 검색 */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          {/* 필터 */}
          <div className="flex gap-2">
            {["전체", "동행", "정보"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm border ${
                  activeFilter === filter
                    ? "bg-white text-black"
                    : "bg-white/20 text-white hover:bg-white/30"
                } transition`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="채팅방 제목 검색"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
      </HeroSection>

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
        onClick={onCreate}
        aria-label="새 채팅방 만들기"
      >
        + 새 채팅방
      </button>
    </>
  );
}

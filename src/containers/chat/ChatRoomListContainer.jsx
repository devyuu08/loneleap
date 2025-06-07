import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useChatRooms } from "@/hooks/chat/useChatRooms";

import ChatRoomList from "@/components/chat/ChatRoomList";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner.jsx";

/**
 * ChatRoomListContainer
 * - 채팅방 목록 필터링 및 검색 기능 포함
 * - 전체/카테고리별 분류 및 검색어 필터링 적용
 */

export default function ChatRoomListContainer() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();
  const { data: chatrooms, isLoading } = useChatRooms();

  const roomsByCategory = useMemo(() => {
    return activeFilter === "전체"
      ? chatrooms
      : chatrooms.filter((room) => room.category === activeFilter);
  }, [chatrooms, activeFilter]);

  const filteredRooms = useMemo(() => {
    if (!searchKeyword.trim()) return roomsByCategory;
    return roomsByCategory.filter((room) =>
      room.name?.toLowerCase().includes(searchKeyword.trim().toLowerCase())
    );
  }, [roomsByCategory, searchKeyword]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ChatRoomList
      chatrooms={chatrooms}
      filteredRooms={filteredRooms}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onCreate={() => navigate("/chat/create")}
    />
  );
}

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useChatRooms } from "@/hooks/chat/useChatRooms";

import ChatRoomList from "@/components/chat/ChatRoomList";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner.jsx";

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

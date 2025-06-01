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

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(chatrooms)) return [];

    let result = [...chatrooms];

    // 1. 카테고리 필터링
    if (activeFilter !== "전체") {
      result = result.filter((room) => room.category === activeFilter);
    }

    // 2. 검색 필터링
    if (searchKeyword.trim()) {
      result = result.filter((room) =>
        room.name?.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      );
    }

    return result;
  }, [chatrooms, activeFilter, searchKeyword]);

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

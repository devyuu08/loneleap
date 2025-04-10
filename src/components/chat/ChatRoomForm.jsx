// src/components/chat/ChatRoomForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateChatRoom } from "services/queries/useCreateChatRoom";

export default function ChatRoomForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateChatRoom();

  const handleChatRoomFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !user) return;

    try {
      await mutateAsync({ title, description, uid: user.uid });
      navigate("/chat");
    } catch (err) {
      console.error("채팅방 생성 오류:", err);
      alert("채팅방 생성 중 오류가 발생했어요.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">채팅방 만들기</h2>

      <form onSubmit={handleChatRoomFormSubmit} className="space-y-4">
        {/* 제목 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            제목
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="예: 4월 제주 혼행 동행 구함"
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            설명
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="예: 4/15~4/17 제주도 일정 함께할 사람 구해요 :)"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isPending || !title || !description || !user}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-md"
        >
          {isPending ? "생성 중..." : "채팅방 만들기"}
        </button>
      </form>
    </div>
  );
}

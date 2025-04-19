import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateChatRoom } from "services/queries/chat/useCreateChatRoom";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";

export default function ChatRoomForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateChatRoom();

  const [errors, setErrors] = useState({});
  const [didAlert, setDidAlert] = useState(false);

  useEffect(() => {
    // 로딩이 끝났고, 로그인하지 않은 경우에만 실행
    if (!isLoading && !user && !didAlert) {
      alert("로그인이 필요합니다.");
      setDidAlert(true);
      navigate("/login", { state: { from: "/chat/create" } });
    }
  }, [user, isLoading, navigate, didAlert]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!description.trim()) newErrors.description = "설명을 입력해주세요.";
    if (!user) newErrors.user = "로그인이 필요합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChatRoomFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await mutateAsync({ title, description, uid: user.uid });
      navigate("/chat");
    } catch (err) {
      console.error("채팅방 생성 오류:", err);
      if (err.message.includes("제목과 사용자 ID는 필수입니다")) {
        alert("필수 정보가 누락되었습니다. 제목과 로그인 정보를 확인해주세요.");
      } else if (err.code === "permission-denied") {
        alert("채팅방 생성 권한이 없습니다. 로그인 상태를 확인해주세요.");
      } else {
        alert("채팅방 생성 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  if (isLoading || !user) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">채팅방 만들기</h2>

      <form onSubmit={handleChatRoomFormSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-required="true"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="예: 4월 제주 혼행 동행 구함"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1" aria-live="polite">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            설명
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-required="true"
            rows={3}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="예: 4/15~4/17 제주도 일정 함께할 사람 구해요 :)"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1" aria-live="polite">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || !user}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-md"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              생성 중...
            </span>
          ) : (
            "채팅방 만들기"
          )}
        </button>
      </form>
    </div>
  );
}

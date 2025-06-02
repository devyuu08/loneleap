import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateChatRoom } from "@/hooks/chat/useCreateChatRoom";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner.jsx";
import ChatRoomForm from "@/components/chat/ChatRoomForm";

export default function ChatRoomFormContainer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const navigate = useNavigate();
  const { mutateAsync: createRoom, isPending } = useCreateChatRoom((url) =>
    navigate(url)
  );

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

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!description.trim()) newErrors.description = "설명을 입력해주세요.";
    if (!category) newErrors.category = "카테고리를 선택해주세요.";
    if (!user) newErrors.user = "로그인이 필요합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, description, category, user]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      try {
        await createRoom({ title, description, category, user });
      } catch (err) {
        console.error("채팅방 생성 오류:", err);
        alert("채팅방 생성 중 오류가 발생했습니다.");
      }
    },
    [validateForm, title, description, category, user, createRoom]
  );

  if (isLoading || !user) return <LoadingSpinner />;

  return (
    <ChatRoomForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      category={category}
      setCategory={setCategory}
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}

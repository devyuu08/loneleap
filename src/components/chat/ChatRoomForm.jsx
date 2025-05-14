import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateChatRoom } from "services/queries/chat/useCreateChatRoom";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import ErrorMessage from "components/common/ErrorMessage";
import FormSubmitButton from "components/common/FormSubmitButton";
import { Lightbulb } from "lucide-react";

export default function ChatRoomForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateChatRoom(navigate);

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
    if (!category) newErrors.category = "카테고리를 선택해주세요.";
    if (!user) newErrors.user = "로그인이 필요합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChatRoomFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await mutateAsync({
        title,
        description,
        category,
        user,
      });
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
    <article
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/chat-form-bg.jpg')" }} // 감성적인 메시지/대화 이미지 추천
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 내용 전체 */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-white">
        {/* 헤더 문구 */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-white/90 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
          대화를 시작해보세요
        </h2>
        <p className="text-md mt-4 text-white/80 text-center leading-relaxed">
          LoneLeap에서 여행을 함께할 사람들과 <br />
          이야기를 나누는 첫 번째 공간을 만들어보세요.
        </p>

        {/* 채팅방 생성 폼 */}
        <form
          onSubmit={handleChatRoomFormSubmit}
          className="mt-12 space-y-6 bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-md border border-white/30 text-gray-800"
        >
          {/* 제목 */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              채팅방 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 4월 제주 혼행 동행 구함"
              className={`w-full bg-white/70 border ${
                errors.title ? "border-gray-700" : "border-gray-300"
              } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
            />
            <ErrorMessage message={errors.title} />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-semibold mb-1">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="여행 정보나 동행 조건을 자유롭게 적어보세요"
              className={`w-full bg-white/70 border ${
                errors.description ? "border-gray-700" : "border-gray-300"
              } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
            />
            <ErrorMessage message={errors.description} />
          </div>

          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-semibold mb-1">카테고리</label>
            <div className="flex gap-3">
              {["동행", "정보"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    category === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <ErrorMessage message={errors.category} />
          </div>

          {/* 전송 버튼 */}
          <div className="flex justify-end">
            <FormSubmitButton isLoading={isPending} label="채팅방 만들기" />
          </div>
        </form>

        {/* 안내 문구 */}
        <p className="text-center text-xs text-white/80 mt-6">
          채팅방 생성 후, 채팅 목록에서 메시지를 주고받을 수 있습니다.
        </p>

        <section className="mt-16">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              채팅방 가이드라인
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                여행 정보와 경험을 공유하는 목적에 맞는 채팅방을 만들어주세요.
              </li>
              <li>
                다른 여행자들에게 도움이 될 수 있는 명확한 제목과 설명을
                작성해주세요.
              </li>
              <li>모든 참여자를 존중하고 긍정적인 대화 환경을 유지해주세요.</li>
              <li>
                커뮤니티 가이드라인을 위반하는 채팅방은 관리자에 의해 삭제될 수
                있습니다.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

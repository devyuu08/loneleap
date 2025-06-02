import { useCallback, useState } from "react";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFakeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) return;

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    },
    [email]
  );

  return (
    <MainSectionWrapper className="overflow-hidden min-h-[520px]">
      {/* 배경 이미지 */}
      <img
        src="/images/newsletter-bg.jpg"
        alt="배경 이미지"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto text-center text-white py-12">
        <h2 className="text-2xl font-bold mb-4">
          혼자 떠나는 이들을 위한 작은 안내서
        </h2>
        <p className="text-sm mb-8">
          매월 엄선된 혼자 여행 코스와 혼행자들의 이야기를 받아보세요.
        </p>

        <form
          onSubmit={handleFakeSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="w-full sm:w-64 px-4 py-2 
               rounded-full 
               bg-white/30 backdrop-blur 
               text-white placeholder-white/60
               focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <button
            type="submit"
            className="px-5 py-2 
               rounded-full 
               bg-white/20 text-white 
               hover:bg-white/30 hover:text-sky-200
               transition backdrop-blur border border-white/30"
          >
            구독하기
          </button>
        </form>

        {submitted && (
          <p className="text-sm text-green-300 mb-2" role="status">
            구독 신청 완료! (실제 이메일 전송은 없습니다)
          </p>
        )}

        <p className="text-xs text-white/60">
          * 실제 구독 기능은 작동하지 않으며, 포트폴리오 목적의 폼입니다.
        </p>
      </div>
    </MainSectionWrapper>
  );
}

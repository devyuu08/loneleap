import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000); // 3초 후 메시지 사라짐
  };

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl px-8 py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          혼자 떠나는 이들을 위한 작은 안내서
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          매월 엄선된 혼자 여행 추천 코스와 숨겨진 장소, 혼행자들의 이야기를
          받아보세요.
        </p>

        <form
          onSubmit={handleFakeSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="w-full sm:w-64 px-4 py-2 
             rounded-xl border border-transparent 
             bg-white/70 backdrop-blur 
             placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gray-900 text-white rounded hover:bg-black transition"
          >
            구독하기
          </button>
        </form>

        {submitted && (
          <p className="text-sm text-green-600 mt-4">
            구독 신청이 완료되었습니다! (실제 이메일 전송은 없습니다)
          </p>
        )}

        <p className="text-xs text-gray-400 mt-3">
          * 실제 구독 기능은 작동하지 않으며, 포트폴리오 목적의 폼입니다.
        </p>
      </div>
    </section>
  );
}

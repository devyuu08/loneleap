import { Link } from "react-router-dom";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";

export default function OpenChatSection() {
  return (
    <MainSectionWrapper bg="bg-gray-50" className="overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* 왼쪽 텍스트 설명 */}
        <div className="flex-1 max-w-2xl lg:ml-7 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            혼자지만 함께하는 여행
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            LoneLeap 오픈채팅에서 비슷한 여행 취향을 가진 사람들과 실시간으로
            소통해보세요. 일정 공유, 지역 정보, 감성 나눔까지—혼행의 즐거움을
            함께 확장해보세요.
          </p>

          <ul className="space-y-4 text-sm text-gray-700 text-left max-w-md">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 text-lg">✔</span>
              <span>
                <strong>지역별 채팅방</strong> 여행 지역에 따라 소규모
                오픈채팅에서 소통해요.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 text-lg">✔</span>
              <span>
                <strong>실시간 일정 공유</strong> 당일 여행 계획이나 팁을 빠르게
                주고받을 수 있어요.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 text-lg">✔</span>
              <span>
                <strong>가볍고 안전한 소통</strong> 인증된 링크로만 참여할 수
                있어 신뢰할 수 있어요.
              </span>
            </li>
          </ul>

          <Link
            to="/chat"
            className="inline-block mt-8 px-5 py-2 rounded bg-black text-white text-sm hover:bg-gray-800"
          >
            오픈채팅 참여하기
          </Link>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="flex-1 w-full max-w-xl lg:mr-7 mx-auto">
          <img
            src="/images/chat-banner.jpg"
            alt="오픈채팅 소개"
            className="w-full h-auto rounded-xl shadow-md object-cover"
          />
        </div>
      </div>
    </MainSectionWrapper>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";

const features = [
  {
    title: "정보 또는 동행, 목적에 맞게",
    description:
      "여행의 이유만큼 다양한 이야기들, 채팅방을 만들며 나만의 공간을 열어보세요.",
  },
  {
    title: "지역별 이야기 속으로",
    description:
      "지금 떠나고 싶은 지역에 먼저 다녀온 이들과 정보를 주고받으며 여행을 준비해보세요.",
  },
  {
    title: "회원만 함께해요",
    description:
      "혼자가 아닌 안전한 연결. LoneLeap에 가입한 사람들끼리만 소통할 수 있어요.",
  },
];

/**
 * 오픈채팅 기능 소개 섹션
 * - LoneLeap에서 실시간 소통할 수 있는 오픈채팅 기능 안내
 * - 왼쪽 텍스트 + 오른쪽 이미지 구조 (반응형)
 * - 시멘틱 구조 및 접근성 보완
 */

function OpenChatSection() {
  const chatFeatureIcon =
    "w-7 h-7 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs flex items-center justify-center shrink-0";

  const chatJoinButton =
    "inline-block mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition mx-auto lg:ml-0";

  const chatImage =
    "w-full h-full object-cover rounded-3xl shadow-xl ring-1 ring-gray-200";

  return (
    <MainSectionWrapper
      bg="bg-gradient-to-br from-white to-gray-50 py-20"
      containerClass="max-w-screen-xl px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12"
    >
      {/* 왼쪽: 텍스트 설명 */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          혼자지만 함께하는 여행
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          LoneLeap 오픈채팅에서 비슷한 여행 취향을 가진 사람들과 실시간으로
          소통해보세요. 일정 공유, 지역 정보, 감성 나눔까지—혼행의 즐거움을 함께
          확장해보세요.
        </p>

        {/* 특징 리스트 */}
        <ul className="space-y-5 text-xs sm:text-sm text-gray-700 text-center lg:text-left">
          {features.map(({ title, description }, idx) => (
            <li
              key={title}
              className="flex items-start gap-3 text-left justify-center lg:justify-start max-w-md mx-auto lg:mx-0"
            >
              <div className={chatFeatureIcon}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA 버튼 */}
        <Link
          to="/chat"
          className={chatJoinButton}
          aria-label="오픈채팅 기능으로 이동"
        >
          오픈채팅 참여하기
        </Link>
      </div>

      {/* 오른쪽: 이미지 */}
      <div
        className="w-full lg:w-[480px] aspect-[4/3] max-w-md sm:max-w-lg"
        aria-hidden="true"
      >
        <img
          src="/images/chat-banner.jpg"
          alt="오픈채팅 소개"
          loading="lazy"
          decoding="async"
          className={chatImage}
        />
      </div>
    </MainSectionWrapper>
  );
}

export default React.memo(OpenChatSection);

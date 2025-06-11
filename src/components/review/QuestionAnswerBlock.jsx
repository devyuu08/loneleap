import React from "react";

/**
 * QuestionAnswerBlock
 * - 인터뷰 질문(Q)과 답변(A)을 보여주는 블록 UI
 * - isFirst: 첫 질문 여부에 따라 상단 padding 및 border 표시 여부 제어
 * - 주로 인터뷰 결과 상세 페이지에서 사용됨
 */

function QuestionAnswerBlock({ question, answer, isFirst }) {
  return (
    <div className={isFirst ? "" : "pt-10 border-t border-gray-300/30"}>
      {/* 질문 */}
      <h4 className="text-[18px] font-semibold text-gray-800 tracking-tight leading-snug">
        Q. {question}
      </h4>

      {/* 답변 */}
      <div className="mt-4 pl-4 border-l-2 border-gray-200">
        <p className="text-[16px] text-gray-700 leading-loose whitespace-pre-line tracking-wide">
          {answer || "답변 없음"}
        </p>
      </div>
    </div>
  );
}

export default React.memo(QuestionAnswerBlock);

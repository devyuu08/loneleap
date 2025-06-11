import React from "react";
import FormTextarea from "@/components/common/form/FormTextarea";

/**
 * InterviewAnswerForm
 * - 인터뷰 질문 목록을 기반으로 답변을 입력받는 폼 컴포넌트
 * - 질문 배열을 순회하며 FormTextarea 컴포넌트를 렌더링
 * - 상태 변경은 부모로 위임 (onChange)
 * - 각 질문별 에러 메시지도 전달 가능
 */

function InterviewAnswerForm({ questions, answers, onChange, errors = {} }) {
  return (
    <div className="space-y-10">
      {questions.map((q) => (
        <FormTextarea
          key={q.id}
          label={`Q. ${q.text}`}
          id={`question-${q.id}`}
          name={`question-${q.id}`}
          value={answers[q.id] || ""}
          onChange={(e) => onChange(q.id, e.target.value)}
          placeholder="답변을 작성해주세요."
          error={errors[q.id]}
          rows={8}
        />
      ))}
    </div>
  );
}

export default React.memo(InterviewAnswerForm);

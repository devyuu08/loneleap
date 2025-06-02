import React from "react";
import FormTextarea from "@/components/common/form/FormTextarea";

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

import ErrorMessage from "components/common/ErrorMessage";

export default function InterviewAnswerForm({
  questions,
  answers,
  onChange,
  errors = {},
}) {
  return (
    <div className="space-y-10">
      {questions.map((q) => (
        <div key={q.id}>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            Q. {q.text}
          </h3>
          <textarea
            rows={4}
            className={`w-full bg-white/70 border ${
              errors[q.id] ? "border-gray-700" : "border-gray-300"
            } rounded-md px-4 py-2 placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-700`}
            value={answers[q.id] || ""}
            onChange={(e) => onChange(q.id, e.target.value)}
            placeholder="답변을 작성해주세요."
          />
          <ErrorMessage message={errors[q.id]} />
        </div>
      ))}
    </div>
  );
}

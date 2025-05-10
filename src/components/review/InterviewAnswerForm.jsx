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
          <h3 className="text-lg font-medium mb-2">Q. {q.text}</h3>
          <textarea
            rows={4}
            className={`w-full border ${
              errors[q.id] ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black`}
            value={answers[q.id] || ""}
            onChange={(e) => onChange(q.id, e.target.value)}
            placeholder="답변을 작성해주세요."
          />
          {errors[q.id] && (
            <p className="text-sm text-red-500 mt-1">{errors[q.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

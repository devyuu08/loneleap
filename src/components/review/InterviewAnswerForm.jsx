export default function InterviewAnswerForm({ questions, answers, onChange }) {
  return (
    <div className="space-y-10">
      {questions.map((q) => (
        <div key={q.id}>
          <h3 className="text-lg font-medium mb-2">Q. {q.text}</h3>
          <textarea
            rows={4}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            onChange={(e) => onChange(q.id, e.target.value)}
            value={answers[q.id] || ""}
            placeholder="답변을 작성해주세요."
          />
        </div>
      ))}
    </div>
  );
}

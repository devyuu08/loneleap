export default function QuestionAnswerBlock({ question, answer, isFirst }) {
  return (
    <div className={isFirst ? "" : "pt-10 border-t border-gray-300/30"}>
      <h4 className="text-[18px] font-semibold text-gray-800 tracking-tight leading-snug">
        Q. {question}
      </h4>
      <div className="mt-4 pl-4 border-l-2 border-gray-200">
        <p className="text-[16px] text-gray-700 leading-loose whitespace-pre-line tracking-wide">
          {answer || "답변 없음"}
        </p>
      </div>
    </div>
  );
}

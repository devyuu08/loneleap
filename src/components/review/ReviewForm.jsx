import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RatingInput from "./RatingInput";
import ImageUploader from "components/common/ImageUploader";
import InterviewAnswerForm from "components/review/InterviewAnswerForm";
import useAddReview from "services/queries/review/useAddReview";
import { FIXED_QUESTIONS, RANDOM_QUESTIONS } from "data/interviewQuestions";

export default function ReviewForm() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const questions = useMemo(() => {
    const shuffled = [...RANDOM_QUESTIONS].sort(() => Math.random() - 0.5);
    return [...FIXED_QUESTIONS, ...shuffled.slice(0, 3)];
  }, []);

  const { addReview, isLoading } = useAddReview({
    onErrorCallback: (err) => setSubmitError(err.message),
  });

  const handleNextStep = () => {
    const newErrors = {};
    if (!title) newErrors.title = "제목을 입력해주세요.";
    if (!destination) newErrors.destination = "여행지명을 입력해주세요.";
    if (rating === 0) newErrors.rating = "별점을 선택해주세요.";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setStep(2);
  };

  const handleChangeAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const emptyAnswer = questions.find((q) => !answers[q.id]?.trim());
      if (emptyAnswer) {
        alert(`"${emptyAnswer.text}" 질문에 답변을 작성해주세요.`);
        return;
      }

      addReview(
        {
          title,
          destination,
          rating,
          image,
          type: "interview",
          interviewAnswers: answers,
          interviewQuestions: questions,
        },
        {
          onSuccess: () => {
            navigate("/reviews");
          },
          onError: (err) => {
            setSubmitError(err.message);
          },
        }
      );
    },
    [title, destination, rating, image, answers, questions, addReview, navigate]
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">
          혼자 떠난 그 순간, 당신의 이야기로 남겨보세요
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          낯선 도시, 익숙하지 않은 거리, 홀로 마주한 풍경과 감정을 기록해보세요
        </p>
      </div>

      {step === 1 && (
        <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              리뷰 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 제주도 혼행 후기"
              className={`w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* 여행지명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              여행지명
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="예: 제주"
              className={`w-full border ${
                errors.destination ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.destination && (
              <p className="text-sm text-red-500 mt-1">{errors.destination}</p>
            )}
          </div>

          {/* 별점 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              별점
            </label>
            <RatingInput value={rating} onChange={setRating} />
            {errors.rating && (
              <p className="text-sm text-red-500 mt-1">{errors.rating}</p>
            )}
          </div>

          {/* 이미지 업로드 */}
          <ImageUploader imageFile={image} onChange={setImage} />

          {/* 다음 단계 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 text-sm rounded-md bg-black text-white hover:bg-gray-900"
            >
              다음 단계로
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSubmit}
          className="space-y-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-center">
            여행에 대한 질문에 답해주세요
          </h2>

          <InterviewAnswerForm
            questions={questions}
            answers={answers}
            onChange={handleChangeAnswer}
          />

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 text-sm rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              이전 단계로
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm rounded-md bg-black text-white hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? "등록 중..." : "리뷰 등록"}
            </button>
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-600 mt-2">
              {submitError}
            </p>
          )}
        </form>
      )}

      <div className="mt-12 max-w-3xl mx-auto bg-gray-50 text-sm text-gray-600 px-6 py-5 rounded-xl shadow-sm leading-relaxed">
        <p className="font-semibold text-gray-800 mb-2">리뷰 작성 안내</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            리뷰 등록 후에도 이미지를 추가하거나 내용을 수정할 수 있습니다.
          </li>
          <li>질문을 통해 여행의 감정을 구체적으로 남겨보세요.</li>
          <li>
            작성된 리뷰는 개인 마이페이지 또는 리뷰 리스트에서 확인할 수
            있습니다.
          </li>
        </ul>
      </div>
    </section>
  );
}

import React from "react";
import RatingInput from "@/components/review/RatingInput";
import ImageUploader from "@/components/common/upload/ImageUploader";
import InterviewAnswerForm from "@/components/review/InterviewAnswerForm";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import FormSubmitButton from "@/components/common/button/FormSubmitButton";
import FormInput from "@/components/common/form/FormInput";

/**
 * ReviewForm
 * - 두 단계로 구성된 리뷰 작성 폼 (step 1: 기본 정보, step 2: 인터뷰 답변)
 * - 여행 제목, 장소, 별점, 이미지 업로드 → 인터뷰 질문 답변 순서로 작성
 * - 상태 및 오류 처리를 props로 전달받아 제어
 */

function ReviewForm({
  step,
  setStep,
  title,
  setTitle,
  destination,
  setDestination,
  rating,
  setRating,
  image,
  setImage,
  questions,
  answers,
  onChangeAnswer,
  handleNextStep,
  handleSubmit,
  isSubmitting,
  submitLabel,
  errors,
  submitError,
}) {
  const formStep1Class =
    "mt-12 space-y-6 bg-white/60 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-md border border-white/30 text-gray-800";

  const formStep2Class =
    "space-y-10 bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200 text-gray-800";

  const stepButtonBase =
    "px-6 py-3 text-sm font-semibold rounded-full text-gray-800 shadow-md hover:shadow-xl hover:bg-white transition-all backdrop-blur-sm border border-white/30";

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/review-form-bg.jpg')" }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 리뷰 작성 폼 전체 영역 */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-white">
        {/* 인트로 메시지 */}
        <header className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white/90 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
            혼자 떠난 그 순간, 당신의 이야기로 남겨보세요
          </h2>
          <p className="text-sm sm:text-base mt-3 sm:mt-4 text-white/80 leading-relaxed">
            낯선 도시, 익숙하지 않은 거리.
            <br />
            홀로 마주한 풍경과 감정을 천천히 풀어보세요.
          </p>
        </header>

        {/* 폼 영역 */}
        <div className="mt-10">
          {/* Step 1: 기본 리뷰 정보 입력 */}
          {step === 1 && (
            <form className={formStep1Class}>
              <FormInput
                label="리뷰 제목"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 비 오는 날의 제주 혼행기"
                error={errors.title}
              />

              <FormInput
                label="여행지명"
                id="destination"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="예: 성산일출봉, 한라산, 월정리 해변"
                error={errors.destination}
              />

              {/* 별점 */}
              <div>
                <label className="block text-sm font-semibold mb-1">별점</label>
                <RatingInput value={rating} onChange={setRating} />
                <ErrorMessage message={errors.rating} />
              </div>

              {/* 이미지 업로더 */}
              <ImageUploader imageFile={image} onChange={setImage} />

              {/* 다음 단계 버튼 */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`${stepButtonBase} bg-white/80`}
                >
                  다음 질문으로 이어가기 →
                </button>
              </div>
            </form>
          )}

          {/* Step 2: 인터뷰형 질문 폼 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className={formStep2Class}>
              <h2 className="text-2xl font-semibold text-center">
                여행에 대한 질문에 답해주세요
              </h2>

              <InterviewAnswerForm
                questions={questions}
                answers={answers}
                onChange={onChangeAnswer}
                errors={errors}
              />

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`${stepButtonBase} bg-white/70`}
                >
                  ← 이전 단계로 돌아가기
                </button>
                <FormSubmitButton
                  isLoading={isSubmitting}
                  label={submitLabel}
                  fullWidth={false}
                />
              </div>

              {submitError && (
                <p className="text-center text-sm text-red-600 mt-2">
                  {submitError}
                </p>
              )}
            </form>
          )}

          {/* 리뷰 작성 가이드 안내 */}
          <section className="mt-12 bg-white/80 backdrop-blur-md text-sm text-gray-700 px-6 py-5 rounded-xl shadow-sm leading-relaxed">
            <p className="font-semibold text-gray-800 mb-2">리뷰 작성 안내</p>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li>
                <strong>1단계</strong>: 여행 제목, 장소, 별점, 대표 이미지를
                입력해 주세요.
              </li>
              <li>
                <strong>2단계</strong>: 준비된 질문들에 따라 여행의 감정을
                천천히 풀어내 보세요.
              </li>
              <li>
                각 질문은 <strong>당신만의 여행 이야기</strong>를 더 풍부하게
                만들어줍니다.
              </li>
              <li>
                리뷰는 등록 후에도 <strong>수정하거나 이미지를 추가</strong>할
                수 있어요.
              </li>
              <li>
                작성한 리뷰는 <strong>리스트 페이지</strong>에서도 다른
                여행자들과 함께 공유됩니다.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ReviewForm);

import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useReviewDetail } from "@/hooks/review/useReviewDetail";
import useAddReview from "@/hooks/review/useAddReview";

import { FIXED_QUESTIONS, RANDOM_QUESTIONS } from "@/data/interviewQuestions";
import { updateReview as updateReviewData } from "@/services/review/updateReview";
import { uploadImage } from "@/utils/uploadImage";
import ReviewForm from "@/components/review/ReviewForm";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { QUERY_KEYS } from "@/constants/queryKeys";
import toast from "react-hot-toast";

/**
 * ReviewFormContainer
 * - 리뷰 작성 및 수정 로직을 처리하는 컨테이너 컴포넌트
 * - step 상태를 기반으로 폼 UI를 단계별로 렌더링하며, 유효성 검사 포함
 * - Firebase Storage를 통한 이미지 업로드, Firestore에 리뷰 저장 처리
 * - 작성/수정 모드를 isEditMode로 분기하여 UI와 제출 처리 분기
 */

export default function ReviewFormContainer({ isEditMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading } = useReviewDetail(id, {
    enabled: isEditMode,
  });

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [destination, setDestination] = useState(
    initialData?.destination || ""
  );
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [image, setImage] = useState(
    initialData?.imageUrl ? initialData.imageUrl : null
  );
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(initialData?.interviewAnswers || {});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const randomQuestions = useMemo(() => {
    return [
      ...FIXED_QUESTIONS,
      ...RANDOM_QUESTIONS.sort(() => Math.random() - 0.5).slice(0, 3),
    ];
  }, []);

  useEffect(() => {
    if (isEditMode && initialData) {
      setTitle(initialData.title);
      setDestination(initialData.destination);
      setRating(initialData.rating);
      setImage(initialData.imageUrl || null);
      setAnswers(initialData.interviewAnswers || {});
      setQuestions(initialData.interviewQuestions || []);
    } else {
      setQuestions(randomQuestions);
    }
  }, [initialData, isEditMode, randomQuestions]);

  const { mutate: addReview, isPending: isCreating } = useAddReview({
    onError: (err) => setSubmitError(err.message),
  });

  const { mutate: updateReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedData }) => updateReviewData(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REVIEW_DETAIL(id) });
      navigate(`/reviews/${id}`);
    },
    onError: () => toast.error("리뷰 수정 중 오류가 발생했습니다."),
  });

  const isSubmitting = isEditMode ? isUpdating : isCreating;
  const submitLabel = isEditMode ? "리뷰 수정 완료" : "리뷰 등록 완료";

  const handleNextStep = useCallback(() => {
    const newErrors = {};
    if (!title) newErrors.title = "제목을 입력해주세요.";
    if (!destination) newErrors.destination = "여행지명을 입력해주세요.";
    if (rating === 0) newErrors.rating = "별점을 선택해주세요.";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setStep(2);
  }, [title, destination, rating]);

  const handleChangeAnswer = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const newErrors = {};
      questions.forEach((q) => {
        if (!answers[q.id]?.trim()) {
          newErrors[q.id] = "답변을 작성해주세요.";
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      let imageUrl = "";
      if (image instanceof File) {
        try {
          imageUrl = await uploadImage(image, "reviews");
        } catch (err) {
          setSubmitError("이미지 업로드에 실패했습니다.");
          return;
        }
      } else if (typeof image === "string") {
        imageUrl = image;
      }

      const reviewData = {
        title,
        destination,
        rating,
        image: imageUrl,
        type: "interview",
        interviewAnswers: answers,
        interviewQuestions: questions,
      };

      if (isEditMode && id) {
        updateReview({ id, updatedData: reviewData });
      } else {
        addReview(reviewData, {
          onSuccess: (newId) => navigate(`/reviews/${newId}`),
        });
      }
    },
    [
      title,
      destination,
      rating,
      image,
      questions,
      answers,
      isEditMode,
      id,
      updateReview,
      addReview,
      navigate,
    ]
  );

  if (isEditMode && isLoading) return <LoadingSpinner />;

  if (isEditMode && !isLoading && !initialData) {
    return <NotFoundMessage message="리뷰를 찾을 수 없습니다." />;
  }

  return (
    <ReviewForm
      step={step}
      setStep={setStep}
      title={title}
      setTitle={setTitle}
      destination={destination}
      setDestination={setDestination}
      rating={rating}
      setRating={setRating}
      image={image}
      setImage={setImage}
      questions={questions}
      answers={answers}
      onChangeAnswer={handleChangeAnswer}
      handleNextStep={handleNextStep}
      handleSubmit={handleSubmit}
      isLoading={isEditMode ? isUpdating : isCreating}
      isEditMode={isEditMode}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
      errors={errors}
      submitError={submitError}
    />
  );
}

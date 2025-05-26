import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "services/firebase";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "utils/uploadImage";
import { useAddItinerary } from "hooks/itinerary/useAddItinerary";
import { updateItinerary } from "services/itineraryService";
import { useItineraryDetail } from "hooks/itinerary/useItineraryDetail";
import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import ItineraryForm from "components/itinerary/ItineraryForm";

export default function ItineraryFormContainer({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: initialData, isLoading } = useItineraryDetail(id, {
    enabled: isEditMode,
  });

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  // 초기값 세팅
  useEffect(() => {
    if (isEditMode && initialData) {
      setTitle(initialData.title || "");
      setLocation(initialData.location || "");
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
      setSummary(initialData.summary || "");
      setIsPublic(initialData.isPublic ?? true);
      setImageFile(initialData.imageUrl || null);
    }
  }, [initialData, isEditMode]);

  const { mutate: addMutate, isPending: isAdding } = useAddItinerary();
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedData }) => updateItinerary(id, updatedData),
    onSuccess: () => navigate(`/itinerary/${id}`),
    onError: () => alert("일정 수정 중 오류가 발생했습니다."),
  });

  const isSubmitting = isEditMode ? isUpdating : isAdding;
  const submitLabel = isEditMode ? "일정 수정 완료" : "일정 등록 완료";

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!location.trim()) newErrors.location = "여행지를 입력해주세요.";
    if (!startDate) newErrors.startDate = "시작일을 선택해주세요.";
    if (!endDate) newErrors.endDate = "종료일을 선택해주세요.";
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "종료일은 시작일보다 이후여야 합니다.";
    }
    if (!summary.trim()) newErrors.summary = "여행 소개를 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user?.uid) {
      alert("로그인이 필요합니다.");
      return;
    }

    let imageUrl = "";
    if (imageFile instanceof File) {
      try {
        imageUrl = await uploadImage(imageFile, "itineraries", user.uid);
      } catch (err) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    } else if (typeof imageFile === "string") {
      imageUrl = imageFile;
    }

    const itineraryData = {
      title,
      location,
      startDate,
      endDate,
      summary,
      isPublic,
      image: imageUrl,
      userId: user.uid,
      days: initialData?.days || [],
      checklist: initialData?.checklist || { required: [], optional: [] },
    };

    isEditMode
      ? updateMutate({ id, updatedData: itineraryData })
      : addMutate(itineraryData, {
          onSuccess: (newId) => navigate(`/itinerary/${newId}`),
        });
  };

  // 로딩 처리
  if (isEditMode && isLoading) return <LoadingSpinner />;
  if (isEditMode && !isLoading && !initialData) {
    return <NotFoundMessage message="일정을 찾을 수 없습니다." />;
  }

  return (
    <ItineraryForm
      title={title}
      setTitle={setTitle}
      location={location}
      setLocation={setLocation}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      summary={summary}
      setSummary={setSummary}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
      imageFile={imageFile}
      setImageFile={setImageFile}
      errors={errors}
      handleSubmit={handleSubmit}
      isEditMode={isEditMode}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
    />
  );
}

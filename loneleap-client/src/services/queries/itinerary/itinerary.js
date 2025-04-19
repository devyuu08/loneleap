import { useNavigate } from "react-router-dom";

import { createItinerary } from "../../firestore";
import { useMutation } from "@tanstack/react-query";

export const useAddItinerary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createItinerary,
    onSuccess: (newId) => {
      // 생성된 일정의 ID로 상세 페이지로 이동
      navigate(`/itinerary/${newId}`);
    },
    onError: (error) => {
      console.error("일정 저장 실패:", error);
      alert("일정 저장에 실패했습니다.");
    },
  });
};

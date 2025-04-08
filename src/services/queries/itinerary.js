import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createItinerary } from "../firestore";

export const useAddItinerary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createItinerary,
    onSuccess: () => {
      navigate("/itinerary");
    },
    onError: (error) => {
      console.error("일정 저장 실패:", error);
      alert("일정 저장에 실패했습니다.");
    },
  });
};

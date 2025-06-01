import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useItineraryDetail } from "@/hooks/itinerary/useItineraryDetail";
import { useDeleteItinerary } from "@/hooks/itinerary/useDeleteItinerary";

import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import ItineraryDetail from "@/components/itinerary/ItineraryDetail";

export default function ItineraryDetailContainer() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user);
  const { data, isLoading, isError } = useItineraryDetail(id);

  const { mutate, isPending } = useDeleteItinerary({
    onSuccess: () => {
      alert("일정이 삭제되었습니다.");
      Navigate("/itinerary");
    },
    onError: () => {
      alert("일정 삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDelete = () => {
    mutate({ itineraryId: id });
  };

  if (isLoading || currentUser.isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="일정을 찾을 수 없습니다." />;

  const isOwner = currentUser?.user?.uid === data.userId;

  return (
    <ItineraryDetail
      itineraryId={id}
      itinerary={data}
      isOwner={isOwner}
      onDelete={handleDelete}
      isDeletePending={isPending}
    />
  );
}

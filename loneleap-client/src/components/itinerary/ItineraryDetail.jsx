import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useItineraryDetail } from "services/queries/itinerary/useItineraryDetail";
import { deleteItinerary } from "services/firestore";
import { useMutation } from "@tanstack/react-query";

import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import DayScheduleList from "./DayScheduleList";

export default function ItineraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteItinerary,
    onSuccess: () => {
      navigate("/itinerary"); // 목록 페이지로 이동
    },
    onError: () => {
      alert("일정 삭제 중 오류가 발생했습니다.");
    },
  });

  const currentUser = useSelector((state) => state.user);
  const { data, isLoading, isError } = useItineraryDetail(id);

  if (isLoading || currentUser.isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="일정을 찾을 수 없습니다." />;

  const isOwner = currentUser?.user?.uid === data.userId;
  const { title, startDate, endDate, memo, location, isPublic } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 상단 제목 + 날짜 */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/itinerary")}
          className="text-sm text-gray-500 mb-2 hover:underline "
        >
          ← 목록으로 돌아가기
        </button>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>

        <p className="text-gray-500">
          {startDate} ~ {endDate} · {location}
        </p>
        {isPublic && (
          <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
            공개 일정
          </span>
        )}
      </div>

      {/* 메모 or 간단한 소개 */}
      {memo && (
        <div className="bg-gray-50 border rounded p-4 text-gray-700">
          {memo}
        </div>
      )}

      {/* 앞으로 추가될 일정 상세 / 포함사항 등은 이 아래 */}
      {data.days && <DayScheduleList days={data.days} />}

      {isOwner && (
        <div className="flex justify-end mt-12">
          <button
            onClick={() => navigate(`/itinerary/edit/${data.id}`)}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg mr-2 hover:bg-gray-800 transition"
          >
            수정하기
          </button>

          <button
            onClick={() => {
              if (confirm("정말로 이 일정을 삭제하시겠습니까?")) {
                deleteMutate(data.id);
              }
            }}
            disabled={isDeleting}
            className="text-sm text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-50"
          >
            {isDeleting ? "삭제 중..." : "삭제하기"}
          </button>
        </div>
      )}
    </div>
  );
}

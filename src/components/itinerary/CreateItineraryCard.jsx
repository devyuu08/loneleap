import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function CreateItineraryCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/itinerary/create")}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate("/itinerary/create");
        }
      }}
      className="group bg-white border border-dashed border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer flex items-center justify-center text-center px-6 py-16"
    >
      <div>
        <div className="flex justify-center mb-2">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-700">
          나만의 여행 일정 만들기
        </p>
        <p className="text-xs text-gray-400 mt-1">
          당신만의 특별한 여행 계획을 시작해보세요
        </p>
        <div className="mt-4">
          <button className="px-4 py-1.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition">
            일정 만들기
          </button>
        </div>
      </div>
    </div>
  );
}

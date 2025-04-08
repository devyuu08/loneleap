import ItineraryForm from "../../components/ItineraryForm";

export default function CreateItinerary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md px-6 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          여행 일정 만들기
        </h1>
        <ItineraryForm />
      </div>
    </div>
  );
}

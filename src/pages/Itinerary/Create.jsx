import ItineraryForm from "../../components/ItineraryForm";

export default function CreateItineraryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md px-6 py-8">
        <ItineraryForm />
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import ItineraryDetail from "@/components/itinerary/ItineraryDetail";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

function PublicItinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "itineraries", id));
        if (!snap.exists()) {
          setError("존재하지 않는 일정입니다.");
          return;
        }

        const data = snap.data();
        if (!data.isPublic) {
          setError("비공개 일정입니다.");
          return;
        }

        setItinerary(data);
      } catch (err) {
        console.error(err);
        setError("일정 조회 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <NotFoundMessage message={error} />;

  return (
    <div className="max-w-5xl mx-auto pt-10 px-4">
      <ItineraryDetail
        itineraryId={id}
        itinerary={itinerary}
        isOwner={false}
        onDelete={() => {}}
        isDeletePending={false}
      />
    </div>
  );
}

export default PublicItinerary;

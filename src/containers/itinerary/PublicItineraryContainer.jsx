import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import NotFoundMessage from "@/components/common/feedback/NotFoundMessage";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import PublicItinerary from "@/components/itinerary/PublicItinerary";

/**
 * PublicItineraryContainer
 * - 공유 링크를 통해 공개 일정을 조회하고 표시
 */

export default function PublicItineraryContainer() {
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
        setError("일정 조회 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <NotFoundMessage message={error} />;

  return <PublicItinerary id={id} itinerary={itinerary} />;
}

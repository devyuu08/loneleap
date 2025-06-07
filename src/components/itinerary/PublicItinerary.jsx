import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

function PublicItinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

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
      }
    };

    fetchData();
  }, [id]);

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!itinerary) return <div className="p-6 text-center">로딩 중...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{itinerary.title}</h1>
      <p className="text-gray-600">{itinerary.summary}</p>
    </div>
  );
}

export default PublicItinerary;

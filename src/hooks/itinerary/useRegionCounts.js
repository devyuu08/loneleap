import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useRegionCounts
 * - 전체 일정 데이터를 기반으로 지역별 일정 개수를 계산하는 query 훅
 * - 지역별 필터 버튼 혹은 지도 기반 시각화 등에 사용
 * - 결과에 총합(total)도 포함됨
 */

const LOCATION_MAP = {
  서울: "seoul",
  경기도: "seoul", // 서울 & 경기로 묶음
  인천: "incheon",
  강원도: "gangwon",
  충청도: "chungcheong",
  전라도: "jeolla",
  경상도: "gyeongsang",
  제주도: "jeju",
};

const fetchRegionCounts = async () => {
  const snapshot = await getDocs(collection(db, "itineraries"));
  const counts = {
    seoul: 0,
    incheon: 0,
    gangwon: 0,
    chungcheong: 0,
    jeolla: 0,
    gyeongsang: 0,
    jeju: 0,
  };

  snapshot.forEach((doc) => {
    const rawLoc = doc.data().location?.trim();
    const mapped = LOCATION_MAP[rawLoc];
    if (mapped) {
      counts[mapped] += 1;
    }
  });

  return counts;
};

export const useRegionCounts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.REGION_COUNTS],
    queryFn: fetchRegionCounts,
    staleTime: 5 * 60 * 1000,
    select: (data) => ({
      ...data,
      total: Object.values(data).reduce((a, b) => a + b, 0),
    }),
  });
};

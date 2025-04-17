// src/components/Home/DestinationList.jsx
import { Link } from "react-router-dom";

const destinations = [
  {
    name: "제주도",
    desc: "힐링과 자연이 공존하는 섬",
    image: "/images/jeju_island.jpg",
  },
  {
    name: "부산",
    desc: "바다와 도심의 조화",
    image: "/images/busan_gamcheon_culture_village.jpg",
  },
  {
    name: "경주",
    desc: "역사와 고요함이 있는 도시",
    image: "/images/gyeongju_hwarang.jpg",
  },
];

export default function DestinationList() {
  return (
    <section className="py-20 px-6 bg-white">
      {/* 타이틀 + 링크 */}
      <div className="relative mb-10">
        <h2 className="text-2xl font-bold text-center">추천 여행지</h2>
        <Link
          to="/recommendations/preview"
          className="absolute right-0 top-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          더보기 →
        </Link>
      </div>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((d, idx) => (
          <Link
            to="/recommendations/preview" // 클릭 시 안내 페이지로 이동
            key={idx}
            className="text-center rounded-lg overflow-hidden shadow hover:shadow-lg transition block"
          >
            <img
              src={d.image}
              alt={d.name}
              onError={(e) => {
                if (!e.target.dataset.fallback) {
                  e.target.src = "/images/placeholder.jpg";
                  e.target.dataset.fallback = "true";
                }
              }}
              className="w-full h-48 object-cover bg-gray-200"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{d.name}</h3>
              <p className="text-sm text-gray-600">{d.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

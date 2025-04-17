// src/components/Home/DestinationList.jsx

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
      <h2 className="text-2xl font-bold text-center mb-10">추천 여행지</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={dest.image}
              alt={dest.name}
              onError={(e) => {
                if (!e.target.dataset.fallback) {
                  e.target.src = "/images/free-icon-no-pictures-3875148.png";
                  e.target.dataset.fallback = "true"; // 재귀 방지
                }
              }}
              className="w-full h-48 object-cover bg-gray-200"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{dest.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{dest.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

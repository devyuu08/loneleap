import { Link } from "react-router-dom";

const regions = [
  {
    name: "서울 & 경기",
    slug: "seoul",
    count: 24,
    desc: "도심 속 혼자만의 시간을 위한 장소들",
    position: { top: "42%", left: "48%" },
  },
  {
    name: "강원도",
    slug: "gangwon",
    count: 18,
    desc: "자연과 함께하는 고요한 여행 장소들",
    position: { top: "30%", left: "60%" },
  },
  {
    name: "제주도",
    slug: "jeju",
    count: 22,
    desc: "섬 속의 고독을 즐기는 장소들",
    position: { top: "85%", left: "30%" },
  },
];

export default function RegionMapSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gray-50 px-8 py-20">
      {/* 왼쪽 설명 */}
      <div className="flex-1 max-w-lg ml-10">
        <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">
          Explore Korean Destinations
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          혼자 여행하기 좋은 한국의 지역별 일정과 숨겨진 명소를 탐색해보세요.
        </p>

        <div className="flex flex-col gap-4">
          {regions.map((r) => (
            <div key={r.slug} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                {r.count}
              </div>
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-500">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/itineraries`}
          className="inline-block mt-6 px-5 py-2 rounded bg-black text-white text-sm hover:bg-gray-800"
        >
          더 많은 일정 보러가기
        </Link>
      </div>

      {/* 오른쪽 지도 */}
      <div className="relative w-full max-w-xl aspect-[5/4] mr-10">
        <img
          src="/images/korea-map.png"
          alt="대한민국 지도"
          className="w-full h-full object-contain"
        />

        {regions.map((r) => (
          <div
            key={r.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: r.position.top, left: r.position.left }}
          >
            <Link
              to={`/itineraries/${r.slug}`}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              {r.count}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
  {
    name: "서울",
    desc: "다채로운 문화와 미식의 중심",
    image: "/images/seoul_night.jpg",
  },
  {
    name: "강릉",
    desc: "해돋이 명소와 커피 거리",
    image: "/images/gangneung_beach.jpg",
  },
];

export default function DestinationSlider() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="relative mb-10">
        <h2 className="text-2xl font-bold text-gray-900">인기 여행지</h2>
        <p className="text-gray-500 text-sm">
          혼자 여행하기 좋은 특별한 장소들
        </p>
        <Link
          to="/recommendations"
          className="absolute right-0 top-0 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          더보기 →
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {destinations.map((d, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to="/recommendations"
              className="relative block w-full h-72 rounded-xl overflow-hidden shadow hover:brightness-105 transition"
            >
              {/* 이미지 */}
              <img
                src={d.image}
                alt={d.name}
                onError={(e) => {
                  if (!e.target.dataset.fallback) {
                    e.target.src = "/images/placeholder.jpg";
                    e.target.dataset.fallback = "true";
                  }
                }}
                className="w-full h-full object-cover"
              />
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              {/* 텍스트 */}
              <div className="absolute bottom-4 left-4 text-white z-10">
                <h3 className="font-semibold text-lg">{d.name}</h3>
                <p className="text-sm">{d.desc}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

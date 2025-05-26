import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { useRecommendationList } from "hooks/recommendation/useRecommendationList";
import SkeletonImage from "components/common/SkeletonImage";

export default function DestinationSlider() {
  const { data: destinations, isLoading } = useRecommendationList();

  if (isLoading || !destinations) return null;

  return (
    <section className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* 제목 + 설명 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            이 계절, 혼자 떠나기 좋은 곳
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            당신의 감성에 닿는, 잊지 못할 여행지를 소개합니다.
          </p>
          <Link
            to="/recommendations"
            className="inline-block mt-4 text-sm px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            더보기 →
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {destinations.slice(0, 8).map((place) => (
            <SwiperSlide key={place.id}>
              <Link
                to={`/recommendations/${place.id}`}
                className="relative block w-full h-72 rounded-xl overflow-hidden shadow hover:brightness-105 transition bg-gray-200"
              >
                <SkeletonImage
                  src={place.imageUrl || "/images/placeholder.jpg"}
                  alt={place.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <p className="text-sm line-clamp-2">{place.summary}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

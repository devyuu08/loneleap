import RecommendationHero from "@/components/recommendation/RecommendationHero";
import RecommendationDescription from "@/components/recommendation/RecommendationDescription";
import RecommendationLocation from "@/components/recommendation/RecommendationLocation";
import { Link } from "react-router-dom";

export default function RecommendationDetail({ data }) {
  return (
    <>
      <RecommendationHero data={data} />
      <RecommendationDescription
        description={data.description}
        locationInfo={data.locationInfo}
      />
      <RecommendationLocation
        directions={data.directions}
        nearbyInfo={data.nearbyInfo}
        locationInfo={data.locationInfo}
      />

      {/* 일정 만들기 CTA 섹션 */}
      <section className="px-4 sm:px-6 md:px-8 py-20 sm:py-24">
        <div className="max-w-3xl sm:max-w-4xl mx-auto border-2 border-dashed border-gray-300 rounded-2xl px-6 sm:px-10 py-10 sm:py-12 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            이 여정을 나만의 이야기로 만들고 싶다면
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">{data.name}</span>에서
            받은 감동을 당신만의 일정으로 완성해보세요. 혼자 떠나는 이 순간, 더
            특별해질 거예요.
          </p>
          <Link
            to="/itinerary"
            className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition text-sm sm:text-base"
          >
            나만의 일정 만들기
          </Link>
        </div>
      </section>
    </>
  );
}

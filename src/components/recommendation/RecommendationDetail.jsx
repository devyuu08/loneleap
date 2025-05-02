import RecommendationHero from "./RecommendationHero";
import RecommendationDescription from "./RecommendationDescription";
import RecommendationLocation from "./RecommendationLocation";
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
      />

      {/* 일정 만들기 CTA 섹션 */}
      <section className="bg-[#F3F4F6] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            이 장소로 여행을 시작해보세요.
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            당신만의 특별한 여정에{" "}
            <span className="font-semibold text-gray-800">{data.name}</span>을
            담아보세요. 혼자이기에 더 의미있는 순간들이 기다리고 있습니다.
          </p>
          <Link
            to="/itinerary"
            className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            여정 계획하기
          </Link>
        </div>
      </section>
    </>
  );
}

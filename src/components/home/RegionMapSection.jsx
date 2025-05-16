import { Link } from "react-router-dom";
import { regions } from "data/regions";
import { useState } from "react";

export default function RegionMapSection() {
  const [activeRegion, setActiveRegion] = useState(null);

  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* 왼쪽 설명 */}
        <div className="flex-1 max-w-2xl pl-7">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-left">
            지금, 어디로 떠나고 싶나요?
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            감성 혼행자들이 자주 찾는 지역별 여행 일정. 지도를 클릭해 나만의
            여정을 시작해보세요.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
            to={`/itinerary`}
            className="inline-block mt-6 text-sm px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            더 많은 일정 보러가기 →
          </Link>
        </div>

        {/* 오른쪽 지도 */}
        <div className="relative w-[480px] h-[480px] flex-shrink-0 mx-auto lg:mr-7 z-0 overflow-visible">
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
              {/* 설명 박스: 항상 z-50 이상 */}
              {activeRegion === r.slug && (
                <div className="absolute bottom-[56px] left-1/2 -translate-x-1/2 bg-white text-gray-800 rounded-xl shadow-xl px-4 py-3 w-[200px]">
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.desc}</p>
                </div>
              )}

              <button
                onClick={() =>
                  setActiveRegion(activeRegion === r.slug ? null : r.slug)
                }
                className="relative w-10 h-10 rounded-full bg-white/80 text-gray-900 font-semibold text-sm shadow-lg ring-2 ring-white backdrop-blur-sm flex items-center justify-center transition hover:scale-110"
              >
                {r.count}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { regions } from "@/data/regions";
import React, { useMemo, useState } from "react";

import { useRegionCounts } from "@/hooks/itinerary/useRegionCounts";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";

function RegionMapSection() {
  const [activeRegion, setActiveRegion] = useState(null);

  const { data: regionCounts, isLoading } = useRegionCounts();

  const mappedRegions = useMemo(() => {
    return regions.map((r) => ({
      ...r,
      count: regionCounts[r.slug] || 0,
    }));
  }, [regionCounts]);

  if (!regionCounts) return null;

  const totalCount = Object.values(regionCounts).reduce((acc, v) => acc + v, 0);

  return (
    <MainSectionWrapper bg="bg-gray-100" className="overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* 왼쪽 설명 */}
        <div className="flex-1 max-w-2xl pl-7">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-left">
            지도에서 여행지를 골라보세요
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            대한민국의 구석구석, 혼자 떠나기 좋은 일정들이 기다리고 있어요. 클릭
            한 번으로 일정을 탐색하고, 마음에 드는 여정을 발견해보세요.
          </p>

          {/* 전체 지역 요약 (예: 일정 수 총합, 인기 지역) */}
          <div className="bg-white/60 rounded-xl shadow-sm px-6 py-4 mb-6 backdrop-blur-sm">
            <p className="text-gray-800 text-sm leading-relaxed font-bold">
              총 <span className="text-blue-700">{totalCount}</span>
              개의 일정이{" "}
              <span className="text-blue-700">{regions.length}</span>개 지역에
              걸쳐 등록되어 있어요.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              최근 인기 지역은{" "}
              <span className="font-medium text-black">서울</span>과{" "}
              <span className="font-medium text-black">제주도</span>입니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <Link
            to="/itinerary"
            className="inline-block mt-5 px-5 py-2 rounded bg-black text-white text-sm hover:bg-gray-800"
          >
            전체 일정 보러가기 →
          </Link>
        </div>

        {/* 오른쪽 지도 */}
        <div className="relative w-[480px] h-[480px] flex-shrink-0 mx-auto lg:mr-7 z-0 overflow-visible">
          <img
            src="/images/korea-map.png"
            alt="대한민국 지도"
            className="w-full h-full object-contain"
          />

          {mappedRegions.map((r) => (
            <div
              key={r.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: r.position.top, left: r.position.left }}
            >
              {/* 설명 박스 */}
              {activeRegion === r.slug && (
                <div className="absolute bottom-[56px] left-1/2 -translate-x-1/2 bg-gray-600 text-white rounded-xl shadow-xl px-4 py-3 w-[200px]">
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-xs text-white mt-1">{r.desc}</p>
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
    </MainSectionWrapper>
  );
}

export default React.memo(RegionMapSection);

import { Link } from "react-router-dom";
import { regions } from "@/data/regions";
import React, { useMemo, useState } from "react";

import { useRegionCounts } from "@/hooks/itinerary/useRegionCounts";
import MainSectionWrapper from "@/components/common/layout/MainSectionWrapper";

/**
 * 지역별 여행 일정 현황 섹션
 * - 왼쪽: 설명 + 등록 일정 수 + CTA 버튼
 * - 오른쪽: 지도 이미지와 각 지역 마커 (일정 수 표시)
 * - 지역 클릭 시 activeRegion 상태 변경
 */

function RegionMapSection() {
  const [activeRegion, setActiveRegion] = useState(null);

  const { data: regionCounts } = useRegionCounts();

  const mappedRegions = useMemo(() => {
    return regions.map((r) => ({
      ...r,
      count: regionCounts?.[r.slug] || 0,
    }));
  }, [regionCounts]);

  if (!regionCounts) return null;

  const totalCount = regionCounts.total;

  const mapContainer =
    "relative w-full max-w-[500px] aspect-[5/4] rounded-3xl bg-white shadow-xl p-6 ring-1 ring-gray-200 mt-8 lg:mt-0 flex-shrink-0";

  const regionMarkerButton =
    "w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/80 text-gray-900 font-semibold text-xs sm:text-sm shadow ring-1 ring-gray-300 flex items-center justify-center transition hover:scale-110";

  const infoBoxWrapper =
    "relative bg-slate-50 border border-dashed border-gray-300 px-6 py-5 rounded-2xl shadow-sm mb-6 mx-auto";

  const itineraryButton =
    "inline-block px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition mx-auto";
  return (
    <MainSectionWrapper
      bg="bg-gradient-to-br from-white to-gray-50 py-20"
      containerClass="max-w-screen-xl px-4 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 sm:gap-10 lg:gap-12"
    >
      {/* 왼쪽: 설명 영역 */}
      <div className="max-w-lg text-center lg:text-left flex-1">
        <h2
          id="region-map-title"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-5"
        >
          지역별 여행 일정 현황을 한눈에!
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-7 leading-relaxed">
          대한민국 구석구석, 혼자 떠나기 좋은 일정이 가득해요. <br />
          지역별로 어떤 일정이 준비되어 있는지 직접 확인해보세요.
        </p>

        {/* 등록 현황 박스 */}
        <aside className={infoBoxWrapper} aria-label="일정 등록 정보">
          <div className="absolute -top-3 left-6 text-xs text-gray-400 px-2 backdrop-blur-sm rounded-md">
            지금 등록된 일정은?
          </div>
          <p className="text-gray-800 text-sm font-semibold">
            총 <span className="text-blue-700">{totalCount}</span>개의 일정이{" "}
            <span className="text-blue-700">{regions.length}</span>개 지역에
            등록되어 있어요.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            최근 인기 지역은 <strong>서울</strong>과 <strong>제주도</strong>
            입니다.
          </p>
        </aside>

        {/* CTA 버튼 */}
        <Link
          to="/itinerary"
          className={itineraryButton}
          aria-label="전체 일정 페이지로 이동"
        >
          전체 일정 보기 →
        </Link>
      </div>

      {/* 오른쪽: 지도 이미지 + 마커 */}
      <figure className={mapContainer} aria-label="대한민국 지역 지도">
        <img
          src="/images/korea-map.png"
          alt="대한민국 지도"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
        />

        {/* 각 지역 마커 */}
        {mappedRegions.map((r) => (
          <figcaption
            key={r.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ top: r.position.top, left: r.position.left }}
          >
            <p className="text-[10px] text-gray-700 font-semibold mb-1">
              {r.name}
            </p>
            <button
              onClick={() =>
                setActiveRegion(activeRegion === r.slug ? null : r.slug)
              }
              className={regionMarkerButton}
            >
              {r.count}
            </button>
          </figcaption>
        ))}
      </figure>
    </MainSectionWrapper>
  );
}

export default React.memo(RegionMapSection);

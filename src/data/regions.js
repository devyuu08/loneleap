/**
 * regions
 * - 홈 페이지의 지도 기반 일정 탐색 섹션에서 사용하는 지역 정보
 * - 각 지역은 슬러그(slug)와 마커 위치(position) 정보를 포함함
 * - 지도에 마커를 렌더링할 때 top/left % 단위 좌표로 위치 지정
 */

export const regions = [
  {
    name: "서울/경기",
    slug: "seoul",
    position: { top: "31%", left: "49%" },
  },
  {
    name: "인천",
    slug: "incheon",
    position: { top: "33%", left: "38%" },
  },
  {
    name: "강원도",
    slug: "gangwon",
    position: { top: "25%", left: "63%" },
  },
  {
    name: "충청도",
    slug: "chungcheong",
    position: { top: "45%", left: "47%" },
  },
  {
    name: "전라도",
    slug: "jeolla",
    position: { top: "60%", left: "45%" },
  },
  {
    name: "경상도",
    slug: "gyeongsang",
    position: { top: "52%", left: "63%" },
  },
  {
    name: "제주도",
    slug: "jeju",
    position: { top: "88%", left: "36%" },
  },
];

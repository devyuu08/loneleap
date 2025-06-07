import { useEffect, useRef } from "react";

/**
 * KakaoMap
 * - 주소 기반으로 카카오 지도를 렌더링하는 컴포넌트
 * - 최초 1회만 SDK 스크립트를 동적 로딩
 * - 주소 검색 결과를 기반으로 마커 표시 및 지도 중심 좌표 설정
 */

// SDK 중복 로딩 방지 플래그
let kakaoScriptLoaded = false;

export default function KakaoMap({ address }) {
  const mapRef = useRef(null);

  useEffect(() => {
    /**
     * 지도 및 주소 기반 마커 렌더링 로직
     */
    const loadMap = () => {
      if (!window.kakao) return;

      const container = mapRef.current;

      // 기본 지도 생성
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 중심
        level: 3,
      });

      // 주소 → 좌표 변환 후 마커 표시
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          new window.kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        }
      });
    };

    /**
     * SDK 스크립트 로드
     * - 이미 로드된 경우엔 다시 추가하지 않음
     */
    if (!kakaoScriptLoaded) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_KEY
      }&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(loadMap);
      };
      document.head.appendChild(script);
      kakaoScriptLoaded = true;
    } else {
      // 이미 로딩된 경우 바로 지도 로드
      window.kakao?.maps.load(loadMap);
    }
  }, [address]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-2xl"
      aria-label="카카오 지도"
    />
  );
}

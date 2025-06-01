import { useEffect } from "react";

export default function KakaoMap({ address }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        // 주소 → 좌표 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            new window.kakao.maps.Marker({
              map,
              position: coords,
            });
            map.setCenter(coords);
          } else {
            console.warn("주소 변환 실패:", status);
          }
        });
      });
    };
  }, [address]);

  return <div id="map" className="w-full h-[400px] rounded-2xl" />;
}

import { useEffect, useRef } from "react";

let kakaoScriptLoaded = false;

export default function KakaoMap({ address }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.kakao) return;
      const container = mapRef.current;
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          new window.kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        }
      });
    };

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
      window.kakao?.maps.load(loadMap);
    }
  }, [address]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-2xl" />;
}

import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/services/firebase";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

// 네이버 OAuth 리디렉션 처리 페이지
export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const returnedState = searchParams.get("state");
    const savedState = sessionStorage.getItem("naver_oauth_state");

    // 중복 요청 방지
    if (calledRef.current) return;
    calledRef.current = true;

    // CSRF 보호: state 값 일치 여부 확인
    if (!code || !returnedState || returnedState !== savedState) {
      alert("잘못된 접근입니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    const fetchCustomToken = async () => {
      try {
        // 서버에서 Firebase Custom Token 요청
        const res = await fetch(
          `https://us-central1-loneleap-client.cloudfunctions.net/naverCustomToken?code=${code}&state=${returnedState}`
        );

        if (!res.ok) {
          throw new Error("토큰 요청 실패");
        }

        const { firebaseToken } = await res.json();

        // Firebase Custom Token으로 로그인 처리
        await signInWithCustomToken(auth, firebaseToken);

        alert("네이버 로그인 완료");
        navigate("/");
      } catch (err) {
        console.error("네이버 로그인 실패", err);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/login");
      } finally {
        // state 값 삭제 (1회성 토큰)
        sessionStorage.removeItem("naver_oauth_state");
      }
    };

    fetchCustomToken();
  }, []);

  return <LoadingSpinner size="md" />;
}

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/services/firebase"; // 본인의 Firebase 설정 경로에 맞게 수정

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) return;

    const fetchCustomToken = async () => {
      try {
        const res = await fetch(
          `https://us-central1-loneleap-client.cloudfunctions.net/naverCustomToken?code=${code}&state=${state}`
        );

        if (!res.ok) {
          throw new Error("토큰 요청 실패");
        }

        const { firebaseToken } = await res.json();

        await signInWithCustomToken(auth, firebaseToken);

        alert("네이버 로그인 완료");
        navigate("/"); // 로그인 성공 후 이동할 경로
      } catch (err) {
        console.error("네이버 로그인 실패", err);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/login"); // 실패 시 다시 로그인 페이지 등으로
      }
    };

    fetchCustomToken();
  }, []);

  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">로그인 처리 중입니다...</p>
    </div>
  );
}

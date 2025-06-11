export default function LoginWithNaverButton() {
  const handleLogin = () => {
    // 환경변수에서 Naver OAuth 설정값 불러오기
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const state = crypto.randomUUID();

    // CSRF 공격 방지를 위한 상태값 생성 및 저장
    sessionStorage.setItem("naver_oauth_state", state);

    // 네이버 로그인 요청 URL 구성
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    // 네이버 로그인 페이지로 리다이렉트
    window.location.href = naverAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition"
    >
      {/* 네이버 로고 + 버튼 텍스트 */}
      <img src="/naver-btn.png" alt="Naver" className="w-5 h-5" />
      네이버로 계속하기
    </button>
  );
}

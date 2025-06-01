export default function LoginWithNaverButton() {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const state = crypto.randomUUID();

    // CSRF 보호용 상태값 저장
    sessionStorage.setItem("naver_oauth_state", state);

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = naverAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition"
    >
      <img src="/naver-btn.png" alt="Naver" className="w-5 h-5" />
      네이버로 계속하기
    </button>
  );
}

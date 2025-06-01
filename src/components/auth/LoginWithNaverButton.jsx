const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function LoginWithNaverButton() {
  const handleLogin = () => {
    const state = crypto.randomUUID(); // CSRF 방지용
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "store/userSlice";

import { signIn } from "services/auth";
import { signInWithGoogle } from "services/auth";

export default function AuthForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // 에러 초기화
    try {
      const result = await signIn(email, password);
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      console.error("이메일 로그인 실패:", err.message);
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); // 로딩 상태 시작
    setError(""); // 기존 에러 초기화
    try {
      const result = await signInWithGoogle();
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      console.error("Google 로그인 실패:", err.message);
      setError("Google 로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/auth-bg.jpg')` }}
        aria-hidden="true"
      />

      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 w-full max-w-sm p-8 rounded-xl shadow-sm border backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">LONELEAP</h1>
            <p className="mt-1 text-sm text-gray-500">
              혼자 떠나는 여정, 스스로를 향한 도약
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleEmailPasswordLogin}>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6D8591] text-white rounded-md hover:bg-[#4d5e66] transition"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="h-px flex-1 bg-gray-500" />
              또는
              <div className="h-px flex-1 bg-gray-500" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <span className="text-xl">G</span>
              {loading ? "로그인 중..." : "Google로 계속하기"}
            </button>

            <button
              type="button"
              onClick={() => alert("Naver 로그인은 다음 버전에서 지원됩니다.")}
              className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <img src="/naver-btn.png" alt="Naver" className="w-5 h-5" />
              네이버로 계속하기
            </button>

            {/* <button
            type="button"
            className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <span className="text-xl"></span> Apple로 계속하기
          </button> */}
          </form>

          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            아직 계정이 없으신가요?
            <Link
              to="/signup"
              className="ml-1 underline font-medium text-gray-700 hover:text-black"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

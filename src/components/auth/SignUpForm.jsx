import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm({
  email,
  nickname,
  password,
  passwordConfirm,
  error,
  loading,
  showPassword,
  showPasswordConfirm,
  onEmailChange,
  onNicknameChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onTogglePassword,
  onTogglePasswordConfirm,
  onSubmit,
}) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/auth-bg.jpg')` }}
        aria-hidden="true"
      />

      {/* 오버레이 */}
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

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={onEmailChange}
                required
              />
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={nickname}
                onChange={onNicknameChange}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                비밀번호
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={onPasswordChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={onTogglePassword}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={onPasswordConfirmChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={onTogglePasswordConfirm}
                aria-label={
                  showPasswordConfirm
                    ? "비밀번호 확인 숨기기"
                    : "비밀번호 확인 보기"
                }
              >
                {showPasswordConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6D8591] text-white rounded-md hover:bg-[#4d5e66] transition"
            >
              {loading ? "가입 중..." : "가입하기"}
            </button>
          </form>

          <p className="flex items-center justify-between text-sm text-gray-600 mt-6">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-gray-700 underline font-medium hover:text-black"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

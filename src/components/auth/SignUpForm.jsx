import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import FormInput from "@/components/common/form/FormInput";
import FormSubmitButton from "@/components/common/button/FormSubmitButton";

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
    <main className="relative min-h-screen bg-gray-100">
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

      {/* 회원가입 카드 컨테이너 */}
      <section className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 w-full max-w-sm p-8 rounded-xl shadow-sm border backdrop-blur-md">
          {/* 서비스 브랜드 타이틀 */}
          <header className="text-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">LONELEAP</h1>
            <p className="mt-1 text-sm text-gray-500">
              혼자 떠나는 여정, 스스로를 향한 도약
            </p>
          </header>

          {/* 회원가입 입력 폼 */}
          <form className="space-y-5" onSubmit={onSubmit}>
            {/* 이메일 입력 */}
            <FormInput
              id="email"
              name="email"
              type="email"
              label="이메일"
              placeholder="your@email.com"
              value={email}
              onChange={onEmailChange}
            />

            {/* 닉네임 입력 */}
            <FormInput
              id="nickname"
              name="nickname"
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={onNicknameChange}
            />

            {/* 비밀번호 입력 + 보기 토글 */}
            <div className="relative">
              <FormInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="비밀번호"
                value={password}
                onChange={onPasswordChange}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* 비밀번호 확인 입력 + 보기 토글 */}
            <div className="relative">
              <FormInput
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                label="비밀번호 확인"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
              />

              <button
                type="button"
                className="absolute right-3 top-10 transform text-gray-500 hover:text-gray-700"
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

            {/* 오류 메시지 출력 */}
            {error && <ErrorMessage message={error} align="center" />}

            {/* 제출 버튼 */}
            <FormSubmitButton
              isLoading={loading}
              label="가입하기"
              variant="light"
            />
          </form>

          {/* 로그인 페이지 이동 안내 */}
          <footer className="flex items-center justify-between text-sm text-gray-600 mt-6">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-gray-700 underline font-medium hover:text-black"
            >
              로그인
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}

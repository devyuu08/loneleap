import { Link } from "react-router-dom";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import FormInput from "@/components/common/form/FormInput";
import FormSubmitButton from "@/components/common/button/FormSubmitButton";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import LoginWithNaverButton from "@/components/auth/LoginWithNaverButton";

export default function LoginForm({
  email,
  password,
  isEmailLoading,
  isGoogleLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
}) {
  return (
    <main className="relative min-h-screen bg-gray-100">
      {/* 배경 이미지 및 반투명 오버레이 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/auth-bg.jpg')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        aria-hidden="true"
      />

      {/* 로그인 카드 */}
      <section className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 w-full max-w-sm p-8 rounded-xl shadow-sm border backdrop-blur-md">
          {/* 브랜드 타이틀 */}
          <header className="text-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">LONELEAP</h1>
            <p className="mt-1 text-sm text-gray-500">
              혼자 떠나는 여정, 스스로를 향한 도약
            </p>
          </header>

          {/* 로그인 폼 */}
          <form className="space-y-5" onSubmit={onSubmit}>
            {/* 이메일 입력 */}
            <FormInput
              label="이메일"
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={onEmailChange}
            />

            {/* 비밀번호 입력 */}
            <FormInput
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            />

            {/* 이메일 로그인 버튼 */}
            <FormSubmitButton
              isLoading={isEmailLoading}
              label="로그인"
              variant="light"
            />

            {/* 오류 메시지 출력 */}
            {error && <ErrorMessage message={error} align="center" />}

            {/* 구분선 */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="h-px flex-1 bg-gray-500" />
              또는
              <div className="h-px flex-1 bg-gray-500" />
            </div>

            {/* 구글 로그인 버튼 */}
            <button
              type="button"
              onClick={onGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition min-h-[44px]"
            >
              {isGoogleLoading ? (
                <ButtonSpinner size={20} color="black" />
              ) : (
                <>
                  <span className="text-xl">G</span>
                  <span>Google로 계속하기</span>
                </>
              )}
            </button>

            {/* 네이버 로그인 버튼 */}
            <LoginWithNaverButton />
          </form>

          {/* 회원가입 안내 */}
          <footer className="flex items-center justify-between mt-6 text-sm text-gray-600">
            아직 계정이 없으신가요?
            <Link
              to="/signup"
              className="ml-1 underline font-medium text-gray-700 hover:text-black"
            >
              회원가입하기
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}

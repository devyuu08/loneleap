import { Link } from "react-router-dom";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import FormInput from "@/components/common/form/FormInput";
import FormSubmitButton from "@/components/common/button/FormSubmitButton";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

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

          <form className="space-y-5" onSubmit={onSubmit}>
            <FormInput
              label="이메일"
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={onEmailChange}
            />
            <FormInput
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            />

            <FormSubmitButton
              isLoading={isEmailLoading}
              label="로그인"
              variant="light"
            />

            {error && <ErrorMessage message={error} align="center" />}

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="h-px flex-1 bg-gray-500" />
              또는
              <div className="h-px flex-1 bg-gray-500" />
            </div>

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

            <button
              type="button"
              onClick={() => alert("Naver 로그인은 다음 버전에서 지원됩니다.")}
              className="w-full flex items-center justify-center gap-3 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <img src="/naver-btn.png" alt="Naver" className="w-5 h-5" />
              네이버로 계속하기
            </button>
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

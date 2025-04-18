import AdminLoginForm from "@/components/AdminLoginForm";
import { useRouter } from "next/router";

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <AdminLoginForm
        errorMessage={
          router.query.error === "not-admin" ? "관리자 계정이 아닙니다." : ""
        }
      />
    </main>
  );
}

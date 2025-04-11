// 📁 loneleap-admin/components/layout/AdminLayout.jsx
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-bold border-b">LoneLeap 관리자</div>
          <nav className="flex flex-col gap-2 px-6 py-4 text-sm text-gray-700">
            <Link href="/admin/dashboard" className="hover:text-black">
              🏠 대시보드
            </Link>
            <Link href="/admin/reports/reviews" className="hover:text-black">
              📝 리뷰 신고
            </Link>
            <Link href="/admin/reports/chats" className="hover:text-black">
              💬 채팅 신고
            </Link>
            <Link href="/admin/users" className="hover:text-black">
              👤 사용자 관리
            </Link>
            <Link href="/admin/spots" className="hover:text-black">
              📍 추천 여행지 관리
            </Link>
          </nav>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-sm text-gray-500 hover:text-red-500 border px-3 py-2 rounded"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

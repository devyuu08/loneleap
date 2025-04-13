import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { adminEmails } from "@/lib/constants";
import LoadingSpinner from "../LoadingSpinner";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        const isAdmin = user && adminEmails.includes(user.email);
        if (!isAdmin) {
          setLoading(false);
          router.replace("/admin/login");
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.error("인증 상태 확인 중 오류 발생:", error);
        setLoading(false);
        router.replace("/admin/login");
      }
    );

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}

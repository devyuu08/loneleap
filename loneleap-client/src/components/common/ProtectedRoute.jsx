import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "components/common/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <LoadingSpinner />; // 아직 Firebase 확인 중이라면 스피너
  if (!user) return null; // 로그인 안 된 경우는 리다이렉트 후 아무것도 안 보여줌

  return children;
}

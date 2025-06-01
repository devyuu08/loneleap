import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
      setRedirected(true);
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (!user || redirected) return null;

  return children;
}

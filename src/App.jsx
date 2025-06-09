import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { clearUser } from "@/store/userSlice";

import { observeAuth } from "@/services/auth/auth";
import { fetchUserWithProfile } from "@/services/user/fetchUserWithProfile";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Callback from "@/pages/auth/Callback";

import ProtectedRoute from "@/components/common/route/ProtectedRoute";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner.jsx";
import FloatingButtons from "@/components/common/button/FloatingButtons";
import PublicItineraryPage from "@/pages/itinerary/Public";

const Home = React.lazy(() => import("@/pages/home/Home"));
const CreateItineraryPage = React.lazy(() =>
  import("@/pages/itinerary/Create")
);
const ItineraryListPage = React.lazy(() => import("@/pages/itinerary/List"));
const ItineraryDetailPage = React.lazy(() =>
  import("@/pages/itinerary/Detail")
);
const EditItineraryPage = React.lazy(() => import("@/pages/itinerary/Edit"));
const CreateReviewPage = React.lazy(() => import("@/pages/review/Create"));
const ReviewListPage = React.lazy(() => import("@/pages/review/List"));
const ReviewDetailPage = React.lazy(() => import("@/pages/review/Detail"));
const EditReviewPage = React.lazy(() => import("@/pages/review/Edit"));
const CreateChatRoomPage = React.lazy(() => import("@/pages/chat/Create"));
const ChatRoomListPage = React.lazy(() => import("@/pages/chat/List"));
const ChatRoomDetailPage = React.lazy(() => import("@/pages/chat/Detail"));
const MyPage = React.lazy(() => import("@/pages/mypage/MyPage"));
const RecommendationListPage = React.lazy(() =>
  import("@/pages/recommendations/List")
);
const RecommendationDetailPage = React.lazy(() =>
  import("@/pages/recommendations/Detail")
);
const NotFound = React.lazy(() => import("@/pages/errors/NotFound"));

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const isHome = location.pathname === "/";
  const isOAuthCallbackPage = location.pathname === "/oauth/callback";

  const isChatDetailPage =
    pathParts[1] === "chat" &&
    pathParts.length === 3 &&
    pathParts[2] !== "create";

  useEffect(() => {
    const unsubscribe = observeAuth(async (user) => {
      if (user) {
        await fetchUserWithProfile(user, dispatch); // bio 포함하여 Redux 저장
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      {!isChatDetailPage && !isOAuthCallbackPage && <Header />}

      {/* main에 flex-grow를 줘서 Routes가 영역을 채우게 함 */}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/oauth/callback" element={<Callback />} />
            <Route path="/itinerary">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ItineraryListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <CreateItineraryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute>
                    <EditItineraryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ItineraryDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/itinerary/public/:id"
              element={<PublicItineraryPage />}
            />
            <Route path="/reviews">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ReviewListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <CreateReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute>
                    <EditReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ReviewDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/chat">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ChatRoomListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <CreateChatRoomPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ChatRoomDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/mypage">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/recommendations">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <RecommendationListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <RecommendationDetailPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {!isHome && <FloatingButtons />}
      {!isChatDetailPage && !isOAuthCallbackPage && <Footer />}
    </div>
  );
}

export default App;

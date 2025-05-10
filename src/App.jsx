import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "store/userSlice";

import { observeAuth } from "./services/auth";
import { fetchUserWithProfile } from "services/userService";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import AuthForm from "components/auth/AuthForm";

import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";

import Home from "pages/home/Home";
import CreateItineraryPage from "pages/itinerary/Create";
import ItineraryListPage from "pages/itinerary/List";
import ItineraryDetailPage from "pages/itinerary/Detail";
import EditItineraryPage from "pages/itinerary/Edit";
import CreateReviewPage from "pages/review/Create";
import SignUp from "pages/auth/SignUp";
import ReviewListPage from "pages/review/List";
import ReviewDetailPage from "pages/review/Detail";
import CreateChatRoomPage from "pages/chat/Create";
import ChatRoomListPage from "pages/chat/List";
import ChatRoomDetailPage from "pages/chat/Detail";
import MyPage from "pages/mypage/MyPage";
import RecommendationListPage from "pages/recommendations/List";
import RecommendationDetailPage from "pages/recommendations/Detail";
import EditReviewPage from "pages/review/Edit";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = React.useState(true);

  const isRecommendationPage = location.pathname.startsWith("/recommendations");

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
      <Header />

      {/* main에 flex-grow를 줘서 Routes가 영역을 채우게 함 */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<SignUp />} />
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "store/userSlice";

import { observeAuth } from "./services/auth";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import AuthForm from "components/auth/AuthForm";

import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";

import Home from "pages/home/Home";
import CreateItineraryPage from "pages/Itinerary/Create";
import ItineraryListPage from "pages/Itinerary/List";
import ItineraryDetailPage from "pages/Itinerary/Detail";
import EditItineraryPage from "pages/Itinerary/Edit";
import CreateReviewPage from "pages/Review/Create";
import SignUp from "pages/Auth/SignUp";
import ReviewListPage from "pages/Review/List";
import ReviewDetailPage from "pages/Review/Detail";
import CreateChatRoomPage from "pages/Chat/Create";
import ChatRoomListPage from "pages/Chat/List";
import ChatRoomDetailPage from "pages/Chat/Detail";
import MyPage from "pages/mypage/MyPage";
import RecommendationListPage from "./pages/recommendations/List";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = observeAuth((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
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
      <main className="flex-grow pb-16">
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
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationListPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

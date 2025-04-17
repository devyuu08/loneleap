import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser, clearUser } from "store/userSlice";

import { observeAuth } from "./services/auth";

import Header from "components/Header";
import AuthForm from "components/AuthForm";

import Home from "pages/Home"; // 기본 홈화면
import CreateItineraryPage from "pages/Itinerary/Create";
import ItineraryListPage from "pages/Itinerary/List";
import ItineraryDetailPage from "pages/Itinerary/Detail";
import EditItineraryPage from "pages/Itinerary/Edit";
import CreateReviewPage from "pages/Reviews/Create";
import SignUp from "pages/Auth/SignUp";
import ReviewListPage from "pages/Reviews/List";
import ReviewDetailPage from "pages/Reviews/Detail";
import CreateChatRoomPage from "pages/Chat/Create";
import ChatRoomListPage from "pages/Chat/List";
import ChatRoomDetailPage from "pages/Chat/Detail";
import MyPage from "pages/MyPage";
import Footer from "./components/Footer";
import FutureRecommendationPage from "./pages/Recommendations/Preview";

function App() {
  const dispatch = useDispatch();

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
    });

    return () => unsubscribe();
  }, [dispatch]);

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
            <Route index element={<ItineraryListPage />} />
            <Route path="create" element={<CreateItineraryPage />} />
            <Route path="edit/:id" element={<EditItineraryPage />} />
            <Route path=":id" element={<ItineraryDetailPage />} />
          </Route>
          <Route path="/reviews">
            <Route index element={<ReviewListPage />} />
            <Route path="create" element={<CreateReviewPage />} />
            <Route path=":id" element={<ReviewDetailPage />} />
          </Route>
          <Route path="/chat">
            <Route index element={<ChatRoomListPage />} />
            <Route path="create" element={<CreateChatRoomPage />} />
            <Route path=":id" element={<ChatRoomDetailPage />} />
          </Route>
          <Route path="/mypage">
            <Route index element={<MyPage />} />
          </Route>
          <Route
            path="/recommendations/preview"
            element={<FutureRecommendationPage />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

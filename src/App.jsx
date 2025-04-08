import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { observeAuth } from "./services/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/userSlice";

import Header from "./components/Header";
import Home from "./pages/Home"; // 기본 홈화면
import AuthForm from "./components/AuthForm";
import SignUp from "./pages/Auth/SignUp";
import CreateItineraryPage from "./pages/Itinerary/Create";
import ItineraryListPage from "./pages/Itinerary/List";
import ItineraryDetailPage from "./pages/Itinerary/Detail";
import EditItineraryPage from "./pages/Itinerary/Edit";

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
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/itinerary/create" element={<CreateItineraryPage />} />
        <Route path="/itinerary" element={<ItineraryListPage />} />
        <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
        <Route path="/itinerary/edit/:id" element={<EditItineraryPage />} />
      </Routes>
    </>
  );
}

export default App;

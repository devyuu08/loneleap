import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser, clearUser } from "store/userSlice";

import { observeAuth } from "./services/auth";

import Header from "components/Header";
import AuthForm from "components/AuthForm";

import Home from "pages/Home"; // 기본 홈화면
import SignUp from "pages/Auth/SignUp";
import CreateItineraryPage from "pages/Itinerary/Create";
import ItineraryListPage from "pages/Itinerary/List";
import ItineraryDetailPage from "pages/Itinerary/Detail";
import EditItineraryPage from "pages/Itinerary/Edit";

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
        <Route path="/itinerary">
          <Route index element={<ItineraryListPage />} />
          <Route path="create" element={<CreateItineraryPage />} />
          <Route path=":id" element={<ItineraryDetailPage />} />
          <Route path="edit/:id" element={<EditItineraryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// Redux 전역 스토어 설정 파일

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";

// Redux store 생성 및 리듀서 등록
const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 정보 전역 상태
  },
  devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 DevTools 활성화
});

export default store;

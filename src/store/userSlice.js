// 사용자 인증 상태를 관리하는 userSlice

import { createSlice } from "@reduxjs/toolkit";

// 초기 상태
const initialState = {
  user: null, // 로그인하지 않은 상태
  isLoading: true, // 초기 로딩 상태 (onAuthStateChanged 대기)
};

// userSlice 생성
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 사용자 정보 설정 (로그인 시 호출)
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false; // 로딩 완료
    },
    // 사용자 정보 초기화 (로그아웃 시 호출)
    clearUser(state) {
      state.user = null;
      state.isLoading = false; // 로딩 완료
    },
  },
});

// 액션과 리듀서 내보내기
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

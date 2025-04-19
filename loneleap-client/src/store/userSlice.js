import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // 로그인 안 된 상태
  isLoading: true, // 로딩 상태 추가
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false; // 유저 설정되면 로딩 false
    },
    clearUser(state) {
      state.user = null;
      state.isLoading = false; // 로그아웃도 로딩 끝난 상태
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    token: null,
    mobileNumber: '',
    userData: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.mobileNumber = action.payload.mobile_number;
      state.userData = action.payload.userData || null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userData = null;
    },
  },
});

export const { setLoginData, logout } = userSlice.actions;
export default userSlice.reducer;
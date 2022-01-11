import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticating: true,
  serviceList: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticating = false;
    },
    uptadeServiceList(state, action) {
      state.serviceList = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const { setUser, uptadeServiceList } = UserSlice.actions;

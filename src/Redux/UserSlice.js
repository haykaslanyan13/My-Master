import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticating: true,
  id: null,
  masterFilter: "",
  masterRating: [],
  serviceList: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMasterFilter(state, action) {
      state.masterFilter = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticating = false;
    },
    setMasterRating(state, action) {
      state.masterRating = action.payload;
    },
    uptadeServiceList(state, action) {
      state.serviceList = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const { setMasterFilter, setUser, setMasterRating, uptadeServiceList } =
  UserSlice.actions;

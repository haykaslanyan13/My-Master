import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 user: null,
 id: null,
 masterFilter: "",
 masterRating: []
}

const UserSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
  setMasterFilter(state, action){
    state.masterFilter = action.payload
  },
  setUser(state, action){
    state.user = action.payload
  },
  setMasterRating(state, action){
    state.masterRating = action.payload
  },
  setUser(state, action) {
    state.user = action.payload
  },
 }
})

export default UserSlice.reducer
export const {setMasterFilter, setUser, setMasterRating} = UserSlice.actions

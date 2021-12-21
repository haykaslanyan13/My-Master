import { createSlice } from "@reduxjs/toolkit"

const initialState = {
<<<<<<< HEAD
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
  }
 }
})

export default UserSlice.reducer
export const {setMasterFilter, setUser, setMasterRating} = UserSlice.actions
=======
  user: null,
  id: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
>>>>>>> master

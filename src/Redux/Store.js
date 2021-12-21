import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "./UserSlice"

<<<<<<< HEAD
const store = configureStore({
 reducer: {
  user: UserReducer
 }
})
export default store
=======
export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
})
>>>>>>> master

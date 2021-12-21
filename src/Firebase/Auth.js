import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useDispatch } from "react-redux"
import { app } from "./FirebaseUser"

const auth = getAuth()

//  export const signUp =  async (email,password) => {
//    try{
//      await createUserWithEmailAndPassword(auth, email, password)
//    }catch{}
// }

// export const LogOut = async () => {
//   try{
//     await signOut(auth)
//   }catch{}
// }

// export const signIn = async (email,password) => {
//   try{
//     await signInWithEmailAndPassword(auth, email, password)
//   }
//   catch{}
// }

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

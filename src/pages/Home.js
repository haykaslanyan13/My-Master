import { getAuth } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import React from "react"
import { db } from "../Firebase/FirebaseUser"

function Home() {
  const auth = getAuth()
  return (
    <div onClick={() => console.log(auth.currentUser?.uid)}>
      This is home component
    </div>
  )
}

export default Home

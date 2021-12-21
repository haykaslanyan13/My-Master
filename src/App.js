import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Main from "./components/Main"
import { setUser } from "./Redux/UserSlice"

function App() {
  const auth = getAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email))
      } else {
        dispatch(setUser(null))
      }
    })
  }, [])
  return (
    <>
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
    </>
  )
}

export default App

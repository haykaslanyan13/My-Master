import { LinearProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Admin from "./Admin/Admin";
import "./App.css";
import Main from "./components/Main";
import { db } from "./Firebase/FirebaseUser";
import { setUser } from "./Redux/UserSlice";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const {key} = useLocation()
  useEffect(() => {
    window.scrollTo(0,0)
  },[key])


  const getData = useCallback(
    async (db) => {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const currentUserData = userSnapshot.docs.find(
        (doc) => doc.data().email === auth.currentUser.email
      );
      try {
        dispatch(
          setUser({ ...currentUserData.data(), id: currentUserData.id })
        );
      } catch (e) {
        console.error(e);
      }
    },
    [auth, dispatch]
  );

  const isAuthenticating = useSelector((state) => state.user.isAuthenticating);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData(db);
      } else {
        dispatch(setUser(null));
      }
    });
  }, [getData, auth, dispatch]);
  return (
    <>
      {isAuthenticating ? (
        <LinearProgress />
      ) : (
        <Routes onChange={() => {console.log("hey")}}>
          <Route path="admin/*" element={<Admin />} />
          <Route path="*" element={<Main />} />
        </Routes>
      )}
    </>
  );
}

export default App;

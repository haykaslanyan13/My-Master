import { LinearProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import "./App.css";
import Main from "./components/Main";
import { db } from "./Firebase/FirebaseUser";
import { setUser } from "./Redux/UserSlice";

function App() {
  const auth = getAuth();
  const dispatch =  useDispatch();

  async function getData(db) {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);

    const currentUserData = userSnapshot.docs.find(
      (doc) => doc.data().email === auth.currentUser.email
    );
    // console.log(currentUserData)
   try{ dispatch(setUser({ ...currentUserData.data(), id: currentUserData.id }))}catch(e){console.error(e)}
  }

  const isAuthenticating = useSelector((state) => state.user.isAuthenticating);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // getData(db);

       dispatch(setUser({
           email: "aaa@gmail.com",
        firstName: "Aaa",
         id: "QILG2ZLNPeLhrCnmJR9A",
         img: "",
         lastName: "Bbb",
       phoneNumber: "099887766",
         rating: [],
         service: "",
         userType: "master"
     }));

      } else {
        dispatch(setUser(null));
      }
    });
  }, []);
  return (
    <>
      {isAuthenticating ? (
        <LinearProgress />
      ) : (
        <Routes>
          <Route path="admin" element={<Admin />}>
            <Route path=":MastersOrServices" element={<Admin />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      )}
    </>
  );
}

export default App;

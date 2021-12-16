import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
// import AllServices from './pages/AllServices';
// import Navbar from './components/Navbar';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Main from './components/Main';





function App() {
  return (
    <>
      <Routes>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

      </Routes>

      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>

    </>

  );
}

export default App;

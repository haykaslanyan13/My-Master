import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AllServices from './pages/AllServices';
import Home from './pages/Home';

function App() {
  return (
        <>
    <Routes>
      <Route index path="/" element={<Home />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/" element={<Navbar />}/>
      <Route path="/" element={<AllServices />}/>
    </Routes>
    <SignUp />
      <SignIn />
<<<<<<< Updated upstream
      {console.log("asdasd")}
    </div>
=======
    </>
      
>>>>>>> Stashed changes
  );
}

export default App;

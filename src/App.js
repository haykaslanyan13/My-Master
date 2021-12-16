import { Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';



function App() {
  return (
        <>
    <Routes>
<<<<<<< Updated upstream
      <Route path="/home" element={<Home />}/>
    </Routes>
   </>
=======
      {/* <Route index path="/" element={<Home />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/" element={<Navbar />}/> */}
      <Route path="/" element={<AllServices />}/>
    </Routes>
    {/* <SignUp />
      <SignIn /> */}
      </>
>>>>>>> Stashed changes
  );
}

export default App;

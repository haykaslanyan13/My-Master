import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <div style={{display: 'flex'}} className="App">
      <SignUp />
      <SignIn />
      {console.log("asdasd")}
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Route,Routes,useNavigate } from 'react-router-dom';
import LogIn from './LogIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn/>} />
      </Routes>
    </div>
  );
}

export default App;

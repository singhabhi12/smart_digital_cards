import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  return (
     <div className="App">       
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/sign-up' element={<SignUp />} />
    </Routes>
    </div>
  );
}

export default App;

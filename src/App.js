import {BrowserRouter, Routes, Route} from 'react-router-dom';

import NavBar from './components/AppBar';
import Home from './components/Home';
import SignUp from './components/registration/Registration';
import Login from './components/registration/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

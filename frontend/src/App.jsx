import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Cookies.get('isLoggedIn') === 'true';
  });

  useEffect(() => {
    if (isLoggedIn) {
      Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Cookie expires in 7 days
    } else {
      Cookies.remove('isLoggedIn');
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex w-full h-screen">
        {isLoggedIn && <MenuBar onLogout={handleLogout} isLoggedIn={isLoggedIn} />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isLoggedIn ? <RegisterForm onRegister={handleRegister} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
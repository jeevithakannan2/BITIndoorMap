import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    // You might want to automatically log in the user after registration
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="relative w-full h-screen">
        <MenuBar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <RegisterForm onRegister={handleRegister} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
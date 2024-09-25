import React, { useState } from 'react';
import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div className="relative w-full h-screen">
      <MenuBar />
      {isLoggedIn ? (
        <MainPage />
      ) : isRegistering ? (
        <RegisterForm onRegister={handleRegister} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {!isLoggedIn && (
        <div className="absolute bottom-4 right-4">
          {isRegistering ? (
            <button
              onClick={() => setIsRegistering(false)}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Login
            </button>
          ) : (
            <button
              onClick={() => setIsRegistering(true)}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
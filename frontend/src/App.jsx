import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Cookies.get("isLoggedIn") === "true";
  });
  const [username, setUsername] = useState(Cookies.get("username") || "");

  useEffect(() => {
    if (isLoggedIn) {
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("username", username, { expires: 7 });
    } else {
      Cookies.remove("isLoggedIn");
      Cookies.remove("username");
    }
  }, [isLoggedIn, username]);

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  const handleRegister = (registeredUsername) => {
    setIsLoggedIn(true);
    setUsername(registeredUsername);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row w-full h-screen">
        {isLoggedIn && (
          <MenuBar
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            username={username}
          />
        )}
        <div className="flex-grow overflow-auto md:ml-28">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <MainPage username={username} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isLoggedIn ? (
                  <RegisterForm onRegister={handleRegister} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

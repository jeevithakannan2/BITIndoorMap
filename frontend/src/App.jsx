import React, { useState } from 'react';
import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";
import LoginForm from './components/LoginForm'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <div style={styles.container}>
        <MenuBar />
        {isLoggedIn ? <MainPage /> : <LoginForm onLogin={handleLogin} />} 
      </div>
    </>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
  },
};

export default App;

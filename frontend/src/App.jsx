import MainPage from "./components/MainPage.jsx";
import "./styles.css";
import MenuBar from "./components/MenuBar.jsx";

function App() {
  return (
    <>
      <div style={styles.container}>
        <MenuBar />
        <MainPage />
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

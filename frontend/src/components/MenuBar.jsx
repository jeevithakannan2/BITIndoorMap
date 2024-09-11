import { useState } from "react";

const MenuBar = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", onClick: () => setShowAbout(true) },
    { label: "Contact", onClick: () => setShowContact(true) },
  ];

  return (
    <>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          {menuItems.map((item, index) => (
            <li key={index} style={styles.li}>
              {item.href ? (
                <a href={item.href} style={styles.a}>
                  {item.label}
                </a>
              ) : (
                <button onClick={item.onClick} style={styles.button}>
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {showAbout && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>About Us</h2>
            <p>This is the about section.</p>
            <button
              onClick={() => setShowAbout(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContact && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Contact Us</h2>
            <p>This is the contact section.</p>
            <button
              onClick={() => setShowContact(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  nav: {
    backgroundColor: "rgba(51, 51, 51, 0.8)", // Semi-transparent background
    padding: "10px 0",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above the map
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
  },
  li: {
    margin: "0 15px",
  },
  a: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  button: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "500px",
    width: "90%",
  },
  closeButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default MenuBar;

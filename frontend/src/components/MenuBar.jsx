import { useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const MenuBar = ({ onLogout, isLoggedIn }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "About", onClick: () => setShowAbout(true) },
    { label: "Contact", onClick: () => setShowContact(true) },
  ];

  const renderPopup = (title, content, onClose) => {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{content}</p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <div className="w-1/3"></div> {/* Spacer */}
          <ul className="flex space-x-4 justify-center w-1/3">
            {menuItems.map((item, index) => (
              <li key={index} className="list-none">
                {item.to ? (
                  <Link to={item.to} className="text-white hover:text-gray-400">
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-white hover:text-gray-400"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="w-1/3 flex justify-end">
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {showAbout && renderPopup("About Us", "This is the about section.", () => setShowAbout(false))}
      {showContact && renderPopup("Contact Us", "This is the contact section.", () => setShowContact(false))}
    </>
  );
};

export default MenuBar;
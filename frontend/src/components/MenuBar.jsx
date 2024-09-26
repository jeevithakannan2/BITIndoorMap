import { useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBars } from 'react-icons/fa';

const MenuBar = ({ onLogout, isLoggedIn, username }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const menuItems = [
    { label: "Home", to: "/", icon: <FaHome /> },
    { label: "About", onClick: () => setShowAbout(true), icon: <FaInfoCircle /> },
    { label: "Contact", onClick: () => setShowContact(true), icon: <FaEnvelope /> },
  ];

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

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
      document.body,
    );
  };

  return (
    <>
      <nav className={`bg-gray-800 h-full fixed left-0 top-0 z-[1000] transition-all duration-300 ${isMenuExpanded ? 'w-48' : 'w-16'}`}>
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={toggleMenu}
            className="text-white self-center mb-8"
          >
            <FaBars className="text-xl" />
          </button>
          {isMenuExpanded && (
            <div className="text-white mb-8 text-center">Hello, {username}!</div>
          )}
          <ul className="space-y-8 mb-auto flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="list-none w-full">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="text-white hover:text-gray-400 flex items-center justify-center"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isMenuExpanded && <span className="ml-2">{item.label}</span>}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-white hover:text-gray-400 flex items-center justify-center w-full"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isMenuExpanded && <span className="ml-2">{item.label}</span>}
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <div className="mt-auto text-center">
              <button
                onClick={onLogout}
                className="text-white hover:text-gray-400 w-full flex items-center justify-center"
              >
                <FaSignOutAlt className="text-xl" />
                {isMenuExpanded && <span className="ml-2">Logout</span>}
              </button>
            </div>
          )}
        </div>
      </nav>

      {showAbout &&
        renderPopup("About Us", "This is the about section.", () =>
          setShowAbout(false),
        )}
      {showContact &&
        renderPopup("Contact Us", "This is the contact section.", () =>
          setShowContact(false),
        )}
    </>
  );
};

export default MenuBar;

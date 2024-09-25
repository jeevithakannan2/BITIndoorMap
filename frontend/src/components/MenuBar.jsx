import { useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const MenuBar = ({ onLogout, isLoggedIn, username }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      document.body,
    );
  };

  return (
    <>
      <nav className="bg-gray-800 h-full w-40 fixed left-0 top-0 z-[1000] hidden md:block">
        <div className="p-4 flex flex-col h-full">
          <div className="text-white mb-8 text-center">Hello, {username}!</div>
          <ul className="space-y-8 mb-auto flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="list-none">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="text-white hover:text-gray-400 block"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-white hover:text-gray-400 text-center w-full"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <div className="mt-auto text-center">
              <button
                onClick={onLogout}
                className="text-white hover:text-gray-400 w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <nav
        className="bg-gray-800 h-full w-28 fixed left-0 top-0 transform transition-transform duration-300 ease-in-out z-[1000] md:hidden"
        style={{
          transform: showMobileMenu ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="text-white mb-8 text-center">Hello, {username}!</div>
          <ul className="space-y-8 mb-auto flex flex-col items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="list-none">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="text-white hover:text-gray-400 block"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-white hover:text-gray-400 text-center w-full"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <div className="mt-auto text-center">
              <button
                onClick={onLogout}
                className="text-white hover:text-gray-400 w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="fixed top-4 left-4 z-[1001] bg-gray-800 text-white p-2 rounded-md focus:outline-none md:hidden"
      >
        {showMobileMenu ? "✕" : "☰"}
      </button>

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

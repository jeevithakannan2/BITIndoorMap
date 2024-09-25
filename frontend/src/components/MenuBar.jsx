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
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          {menuItems.map((item, index) => (
            <li key={index} className="list-none">
              {item.href ? (
                <a href={item.href} className="text-white hover:text-gray-400">
                  {item.label}
                </a>
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
      </nav>

      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="mb-4">This is the about section.</p>
            <button
              onClick={() => setShowAbout(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">This is the contact section.</p>
            <button
              onClick={() => setShowContact(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;
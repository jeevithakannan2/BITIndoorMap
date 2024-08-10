import React from 'react';

const MenuBar = () => {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Map', href: '/map' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {menuItems.map((item, index) => (
          <li key={index} style={styles.li}>
            <a href={item.href} style={styles.a}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'rgba(51, 51, 51, 0.8)', // Semi-transparent background
    padding: '10px 0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above the map
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  li: {
    margin: '0 15px',
  },
  a: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default MenuBar;
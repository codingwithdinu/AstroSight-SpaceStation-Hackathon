// src/components/Navbar.jsx
import React from 'react';

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">AstroSight - Space Station AI</h1>
    </nav>
  );
};



export default Navbar;
export { Navbar, navItems };

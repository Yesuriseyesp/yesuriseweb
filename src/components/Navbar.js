import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          navbar.classList.add('navbar-locked');
        } else {
          navbar.classList.remove('navbar-locked');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo or Brand */}
      <div className="navbar-brand">
        <Link to="/">Yesurise</Link>
      </div>

      {/* Main Navigation Links */}
      <ul className={`navbar-nav ${isOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/services">Services</Link>
        </li>
        <li className="nav-item">
          <Link to="/careers">Careers</Link>
        </li>
        <li className="nav-item">
          <Link to="/blogs">Blogs</Link> {/* Added Blogs link */}
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Responsive Button */}
      <button className="navbar-toggle" onClick={handleToggle}>
        <span className="navbar-icon">&#9776;</span>
      </button>

      {/* Overlay for Responsive Mode */}
      {isOpen && (
        <div className="overlay" onClick={handleToggle}>
          <ul className="overlay-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blogs">Blogs</Link></li> {/* Added Blogs link */}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

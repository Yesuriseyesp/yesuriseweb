import React from 'react';
import './contact.css';
import { Link } from 'react-router-dom';

const ContactForm = () => {



  return (
    <div className="contact-container">
      {/* Blue and violet gradient section with bubbles */}
      <div className="gradient-section">
        {/* Text "Let's Get Connected" */}
        <h3 className="connect-text">Let's Get Connected..</h3>
        {/* Bubbles */}
        <Link to="/contact" style={{ textDecoration: 'none' }}>
        <button className="contact-button">Contact Us</button>
    </Link>
        {/* Contact Us button */}
        {/* <button className="contact-button">Contact Us</button> */}
      </div>
    </div>
  );
};

export default ContactForm;

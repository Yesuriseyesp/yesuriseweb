import React from 'react';
import {  FaRocket, FaChartLine } from 'react-icons/fa'; // Import icons from react-icons
import './Home.css'; // Import your CSS file for styling
import AboutSection from './About';
import ProcessSection from './process';
import Services from './services';
import ContactForm from './contact';
// import About from './aboutcont';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const container = document.querySelector('.animation-container');
    if (container) {
      // Create and append animated elements
      for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        container.appendChild(bubble);
      }
    }
;  
  
  return (
    <div className="homepage">
      <header className="header">
        <div className="header-content">
          <h2>Your Partner in Digital Marketing Success</h2>
          <div className="button-container">
          <Link to="/contact" style={{ textDecoration: 'none' }}>
          <button className="get-started-button">Get Started</button>
    </Link>
    <div className="animation-container"></div>
    

           
          </div>
          <div className="star-animation">
            {/* Star animation here */}
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </header>
      <div className="content-section">
        <p>We're here to help you succeed in the digital world! <FaRocket /> </p>
        <p>Feel free to explore our services and let's grow your business together! <FaRocket /> <FaChartLine /></p>
      </div>
      <br></br>
      <AboutSection />
      <ProcessSection />
      <Services />
      <ContactForm />
     
    </div>
  );
};

export default HomePage;

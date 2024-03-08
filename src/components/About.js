import React from 'react';
import './About.css'; // Import CSS for styling
import aboutImage from './about.png'; // Import the PNG image
import { Link } from 'react-router-dom';


const AboutSection = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image-container">
          <img className="about-image" src={aboutImage} alt="About Us" />
        </div>
        <div className="about-text">
        <h2>About Us</h2>
      <p>Welcome to Yesurise, your digital innovation partner. We specialize in providing tailored digital solutions for businesses.</p>
      {/* <p>Our mission is to empower startups and small businesses to thrive in the digital landscape. With our expertise and passion for innovation, we aim to revolutionize the way companies engage with their audience and achieve success online.</p> */}
      <p>At Yesurise, we understand the unique challenges of today's digital world. That's why we offer personalized services to meet your specific needs and help you achieve your goals effectively and affordably.</p>
      <p>Join us on this exciting journey as we transform ideas into reality and pave the way for digital success. Let's collaborate and unlock new opportunities for your business together!</p>
  

    <Link to="/contact">
              <button className="button">Reach Us</button> 
              </Link>    
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

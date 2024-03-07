import React from 'react';
import './services.css'; // Import CSS for styling

// Import images using import statement
import socialMediaImage from './5618169.jpg';
import SEO from './32010.jpg';
import ppcImage from './1835.jpg';
import content from './1113.jpg';
import brand from './7781425.jpg';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Improve your website's visibility on search engines and drive organic traffic.",
    image: SEO
  },
  {
    title: "Social Media Marketing",
    description: "Engage with your audience on popular social media platforms to build brand awareness and drive conversions.",
    image: socialMediaImage // Using imported image
  },
  {
    title: "Pay-Per-Click (PPC) Ads",
    description: "Run targeted advertising campaigns on search engines and social media platforms to drive immediate results.",
    image: ppcImage // Using imported image
  },
  {
    title: "Content Marketing",
    description: "Drive engagement and conversions with strategic content creation tailored to your target audience's needs and preferences.",
    image: content // Using imported image
  },
 {
  title: "Branding",
    description: "Craft a compelling brand identity to resonate with your audience, fostering emotional connections and customer loyalty.",
    image: brand // Using imported image
 }
 
  // Add more services as needed
];

const Carousel = ({ services }) => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {services.map((service, index) => (
          <div key={index} className="carousel-item">
            <img className="carousel-image" src={service.image} alt={service.title} />
            <div className="carousel-content">
              <h2 className="carousel-title">{service.title}</h2>
              <p className="carousel-description">{service.description}</p>
              <Link to="/contact">
              <button className="carousel-button">Reach Us</button> 
              </Link>
           {/* Button added */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Services</h1>
      <Carousel services={services} />
    </div>
  );
};

export default App;

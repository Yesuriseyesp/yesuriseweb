import React from 'react';
import { Link } from 'react-router-dom';
import './career.css'; // Import your CSS file

function Career() {
  return (
    <div className="career-container">
      <h1 className="career-heading">Coming soon..!</h1> 
      <Link to="/admin">
        <button className="career-button">Admin Login</button>
      </Link>
    </div>
  );
}

export default Career;

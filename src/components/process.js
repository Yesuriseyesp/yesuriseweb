import React, { useEffect } from 'react';
import "./process.css";

const ProcessSection = () => {
  useEffect(() => {
    const handleScroll = (event) => {
      const processSection = event.target;
      const ball = document.getElementById('rolling-ball');
      if (processSection && ball) {
        const scrollPercentage = (processSection.scrollLeft / (processSection.scrollWidth - processSection.clientWidth)) * 100;
        ball.style.left = scrollPercentage + "%";
      }
    };

    const processSection = document.querySelector('.process-section');
    if (processSection) {
      processSection.addEventListener('scroll', handleScroll);
    }

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      if (processSection) {
        processSection.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return (
    <section className="process-section">
      <div className="container">
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Our Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-icon">1</div>
            <h3>Discovery</h3>
            <p>Initial meetings and research to understand client needs and goals.</p>
          </div>
          <div className="process-step">
            <div className="step-icon">2</div>
            <h3>Strategy</h3>
            <p>Developing a tailored strategy focusing on target audience and channels.</p>
          </div>
          <div className="process-step">
            <div className="step-icon">3</div>
            <h3>Implementation</h3>
            <p>Executing the strategy across various digital marketing channels.</p>
          </div>
          <div className="process-step">
            <div className="step-icon">4</div>
            <h3>Monitoring</h3>
            <p>Constant monitoring and analysis of campaign performance.</p>
          </div>
          <div className="process-step">
            <div className="step-icon">5</div>
            <h3>Optimization</h3>
            <p>Refining strategies based on data insights to maximize results.</p>
          </div>
          <div className="process-step">
            <div className="step-icon">6</div>
            <h3>Reporting</h3>
            <p>Regular reporting to clients showcasing campaign performance and ROI.</p>
          </div>
        </div>
        <div id="rolling-ball" className="rolling-ball"></div>
      </div>
    </section>
  );
};

export default ProcessSection;

import React from 'react';
import '../Styles/Landing.css';

function LandingPage() {
  const handleClick = () => {
    window.location.href = '/login';
  };
  return (
    <div>
      <section className="hero">
        <h1>Welcome to Dans snippets</h1>
        <p>Experience a code snippet website like no other</p>
        <button type="button" onClick={handleClick}>Get started</button>
      </section>
      <section className="features">
        <div className="feature">
          <i className="fas fa-rocket" />
          <h2>Fast and reliable</h2>
          <p>Dans snippets is designed to be lightning fast and always reliable</p>
        </div>
        <div className="feature">
          <i className="fas fa-cog" />
          <h2>Easy to use</h2>
          <p>Our user-friendly interfaces make it easy for anyone to use our products</p>
        </div>
        <div className="feature">
          <i className="fas fa-lock" />
          <h2>Secure</h2>
          <p>Our products are built with state-of-the-art security features to protect your data</p>
        </div>
      </section>
      <section className="cta">
        <h2>Ready to join the future?</h2>
        <button type="button">Get started</button>
      </section>
      <footer>
        <p>&copy; 2023 Dans snippets. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;

import React from "react";
import "./Body.css"; 
import image from '../images/eating.jpg'
const Body = () => {
  return (
    <div className="home-page">
      <div className="left-section">
        <div className="image-container">
          <img
            src={image}
            alt="Food Delivery"
            className="main-image"
            style={{width:'350px',height:'350px',borderRadius:'50%',objectFit:'fill'}}
          />
        </div>
        <div className="text-container">
          <h1>Welcome to Our Food Delivery Service</h1>
          <p>
            Hi i am mahesh Gumma<br/>
            Welcome to my Food Delivery App 
          </p>
        </div>
      </div>
      <div className="right-section">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Fast Delivery</h3>
            <p>Get your food delivered quickly.</p>
          </div>
          <div className="service-card">
            <h3>Quality Food</h3>
            <p>Enjoy delicious and high-quality meals.</p>
          </div>
          <div className="service-card">
            <h3>24/7 Support</h3>
            <p>Customer support available round the clock.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

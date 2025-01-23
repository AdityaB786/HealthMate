import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img src={image} alt="hero" />
          </div>
          <div className="hero-content">
            <p>
              HealthMate is your ultimate companion for managing and enhancing
              your health journey. Designed with a user-centric approach,
              HealthMate combines cutting-edge technology with intuitive
              features to empower individuals to take control of their
              well-being. Whether you're scheduling appointments, tracking your
              health goals, or staying updated with notifications, HealthMate
              ensures a seamless and efficient experience.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

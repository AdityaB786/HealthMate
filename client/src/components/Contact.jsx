import React, { useState } from "react";
import "../styles/chat_contact.css";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault(); 
    const url = "https://formspree.io/f/mwkwpzvl"; 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormDetails({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSuccessMessage("Failed to send your message. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section
      className="register-section flex-center"
      id="contact"
    >
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Contact Us</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form
          onSubmit={formSubmit}
          className="register-form"
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
            required
          />
          <textarea
            name="message"
            className="form-input"
            placeholder="Enter your message"
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
            required
          ></textarea>

          <button
            type="submit"
            className="btn form-btn"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

import React from "react";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import HomeCircles from "../components/HomeCircles";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <HomeCircles />
      <Chat/>
      <Contact />
      <Footer />
    </>
  );
};

export default Home;

import React from "react";
import Header from "./Header";
import "../styles/homepage.css"

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <h6 id="home-text"> SwiftWheel is a user-friendly car rental system designed to offer convenience, flexibility, and seamless travel experiences. Whether you're planning a short city trip or a long adventure, SwiftWheel provides a wide range of vehicles to suit your needs. With a simple booking process, transparent pricing, and instant access to your chosen car.  </h6>
    </div>
  );
};

export default HomePage;

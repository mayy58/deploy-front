import React from "react";
import { Link } from "react-router-dom";
import landing from "../../utils/landing.mp4";
import logo from "../../utils/logocountries.png";
import avion from "../../utils/avion.png";

import "./landing.styles.css";

function Landing() {
  return (
    <div className="main">
      <div className="overlay"></div>

      <video className="video" src={landing} autoPlay loop muted />
      <div className="content">
        <div className="imag">
          <img className="avion" src={avion} alt="logo"></img>
          <img className="logo" src={logo} alt="logo"></img>
        </div>
        <div className="welcome">
          <h1 className="h"> Welcome </h1>
          <p className="p">
            Have fun around the world through different tourist activities with
            the help of our page.
          </p>
          <Link to="/home">
            <button id="button"> Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

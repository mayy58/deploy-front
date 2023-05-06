import React from "react";
import { Link } from "react-router-dom";

import "./card.styles.css";

function Card({ id, name, flag, continent }) {
  return (
    <div className="card-container">
      <h3 className="font">{name}</h3>
      <h5 className="font">{continent}</h5>
      <Link to={`/home/${id}`}>
        <img className="bandera" src={flag} alt="No existe bandera" />
      </Link>
    </div>
  );
}

export default Card;

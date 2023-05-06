import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanDetail } from "../../redux/actions";
import "./detail.styles.css";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);

  return (
    <div className="details">
      {details.hasOwnProperty("name") ? (
        <div className="conteinerDetail">
          <img src={details.flag} alt="Bandera" className="Bandera" />
          <h2>{details.name}</h2>
          <h3>
            <i>Capital:</i> {details.capital}
          </h3>
          <h4>
            <i>Codigo:</i> {details.id}
          </h4>
          <h4>
            <i>Subregión:</i> {details.subregion}
          </h4>
          <h4>
            <i>Área:</i> {parseInt(details.area).toLocaleString("de-DE")} Km2
          </h4>
          <h4>
            <i>Población:</i> {details.population.toLocaleString("de-DE")}
          </h4>
          <div>
            <h4>
              <i>Actividad:</i>
            </h4>
            {details.Activities?.length > 0
              ? details.Activities?.map((act) => (
                  <p key={act.id}>
                    <li>Actividad: {act.name}</li>
                    <li>Temporada: {act.season}</li>
                    <li>Duración: {act.duration}</li>
                    <li>Dificultad: {act.difficulty}</li>
                  </p>
                ))
              : "Have no activity"}
          </div>
        </div>
      ) : (
        <p>Buscando.....</p>
      )}

      <button className="button">
        <Link to="/home">Go Back</Link>
      </button>
    </div>
  );
}

export default Detail;

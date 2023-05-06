import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../../redux/actions/index";

import "./Activity.Create.styles.css";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Se requiere el nombre de la actividad";
  }
  if (!input.duration) {
    error.duration = "Se requiere la duracion";
  }

  return error;
}

function ActivityCreate() {
  const dispatch = useDispatch();
  const getBack = useHistory(); //metodo que me redirije a la ruta que le digo
  const allCountries = useSelector((state) => state.allCountries);
  const [error, setError] = useState({
    name: "Se requiere el nombre de la actividad",
    duration: "",
  });

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    console.log(input);

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      country: input.country.filter((oc) => oc !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(createActivity(input));

    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });

    getBack.push("/home");
  }

  return (
    <div className="tourActivity">
      <h1 id="tourTit">Create a tourist activity</h1>
      <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Actividad Turistica: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Digite el nombre de la actividad turistica"
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>
        <div>
          <label>Dificultad: </label>
          <input
            type="number"
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Duración:</label>
          <input
            type="number"
            value={input.duration}
            name="duration"
            onChange={(e) => handleChange(e)}
            placeholder="Tiempo en horas"
            min="1"
            max="7"
          />
          {error.duration && <p className="error">{error.duration}</p>}
        </div>
        <div>
          <label>Temporada:</label>
          <select onChange={(e) => handleCheck(e)}>
            <option value="Summer">Verano</option>
            <option value="Autumn">Otoño</option>
            <option value="Winter">Invierno</option>
            <option value="Spring">Primavera</option>
            <option value="anyone">Cualquiera</option>
          </select>
        </div>
        <div>
          <label>
            Paises:
            <select onChange={(e) => handleSelect(e)} className="selForm">
              {allCountries.map((oc) => (
                <option key={oc.name} value={oc.name}>
                  {oc.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="countryList">
          {input.country.map((el) => (
            <div key={el}>
              <span className="pais">{el}</span>
              <button className="botonX" onClick={() => handleDelete(el)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <button
            className="button"
            type="submit"
            disabled={error.name || error.duration ? true : false}
          >
            Create
          </button>
          <Link to="/home">
            <button className="button">Go Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default ActivityCreate;

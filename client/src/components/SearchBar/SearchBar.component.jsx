import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../redux/actions/index";

import "./SearchBar.styles.css";

function SearchBar(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  //es name es mi estado local, lo que tipee el usuario se va a guardar en nameCountry.que pasa por props a mi action, que se la pasa al back por query y el return se pasa por payload al reduce
  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name));
    setName("");
    props.resetPage();
  }

  return (
    <div>
      <div className="search-bar">
        <input
          className="input"
          value={name}
          type="text"
          placeholder="Search by Name"
          onChange={(e) => handlerInputChange(e)}
        />
        <button
          className="button"
          type="submit"
          onClick={(e) => handlerSubmit(e)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

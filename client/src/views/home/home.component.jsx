import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  orderByName,
  orderByPopulation,
  filterByActivity,
  getActivities,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card.component";
import Paginated from "../../components/Paginado/Paginated";

import SearchBar from "../../components/SearchBar/SearchBar.component";
import {
  ALL,
  N_AMERICA,
  S_AMERICA,
  ASIA,
  AFRICA,
  EUROPE,
  OCEANIA,
  ANTARCTICA,
} from "../../constantes/constantes";

import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const [, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //estado de la pagina actual, estado que setea la pagina actual
  const [countriesPerPage] = useState(10); //paises que me muestra por pag,
  const indexOfLastCountry = currentPage * countriesPerPage; //-pagina actual, por la cantidad de paises por pag
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); //paises de la pagina actual
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function resetPage() {
    setCurrentPage(1);
  }

  function handlerClick(e) {
    e.preventDefault(); //para que no se recargue la pagina y no se rompa las cosas
    dispatch(getCountries());
  }

  function handlerFilterByContinent(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByContinent(e.target.value));
  }

  function handlerOrderByname(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handlerOrderByPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handlerActivityFilter(e) {
    setOrder("");

    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
  }
  return (
    <div className="home">
      <h1 className="home-title">All Countries</h1>
      <SearchBar resetPage={resetPage} />

      <div className="conteiner1">
        <div>
          <button
            className="button"
            onClick={(e) => {
              handlerClick(e);
            }}
          >
            Refresh
          </button>
        </div>
        <div>
          <Link to="/activities">
            <button className="button">Activities</button>
          </Link>
        </div>

        <div>
          <Link to="/activities/create">
            <button className="button">Create activity</button>
          </Link>
        </div>
      </div>
      <div className="conteiner2">
        <div className="select">
          <select onChange={(e) => handlerFilterByContinent(e)}>
            <option selected disabled>
              Por Continente
            </option>
            <option value={ALL}>Todos</option>
            <option value={AFRICA}>Africa</option>
            <option value={ANTARCTICA}>Antarctica</option>
            <option value={N_AMERICA}>North America</option>
            <option value={S_AMERICA}>South America</option>
            <option value={ASIA}>Asia</option>
            <option value={EUROPE}>Europe</option>
            <option value={OCEANIA}>Oceania</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => handlerOrderByname(e)}>
            <option selected disabled>
              Alphabetical Order
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => handlerOrderByPopulation(e)}>
            <option selected disabled>
              Population
            </option>
            <option value="asc">Minor to Major</option>
            <option value="desc">Major a Minor</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => handlerActivityFilter(e)}>
            <option value="default">Activity</option>
            {allActivities.map((a) => {
              return (
                <option key={a.id} id={a.id} value={a.name}>
                  {a.name} - {a.id}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Paginated
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />

      <div className="grid">
        {currentCountries?.map((el) => {
          return (
            <Link to={"/home/" + el.id}>
              <Card
                name={el.name}
                flag={el.flag}
                continent={el.continent}
                id={el.id}
                key={el.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

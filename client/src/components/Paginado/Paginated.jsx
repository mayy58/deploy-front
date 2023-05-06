import React from "react";
import "./paginated.styles.css";

export default function Paginated({
  countriesPerPage,
  allCountries,
  paginado,
}) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map((number) => (
            <li key={number}>
              <a href onClick={() => paginado(number)}>
                {number}
              </a>
              ;
            </li>
          ))}
      </ul>
    </nav>
  );
}

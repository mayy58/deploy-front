import {
  GET_COUNTRIES,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  FILTER_BY_ACTIVITY,
  GET_NAME_COUNTRY,
  GET_DETAILS,
  FILTER_BY_CONTINENT,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  ALL,
  CLEAN_DETAIL,
} from "../../constantes/constantes";

const initialState = {
  allCountries: [],
  copyAllCountries: [],
  details: [],
  activities: [],
  allActivities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        copyAllCountries: action.payload,
      };
    case GET_NAME_COUNTRY:
      return {
        ...state,
        allCountries: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        details: {},
      };
    case FILTER_BY_CONTINENT:
      const countries = state.copyAllCountries;
      const continentFilter =
        action.payload === ALL
          ? countries
          : countries.filter((el) => el.continent === action.payload);
      return {
        ...state,
        allCountries: continentFilter,
      };

    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === "asc"
          ? state.allCountries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allCountries: sortedArr,
      };
    case ORDER_BY_POPULATION:
      let sortPopulation =
        action.payload === "asc"
          ? state.allCountries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allCountries: sortPopulation,
      };
    //este CREATE_ACTIVITY no hace nada, es el post que que devuelve el estado como esta. no hace nada porque
    //lo estoy creado en una ruta nueva, pero si tengo que informarle a la store
    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      /*  const filterByActivities = state.copyAllCountries;
      const filteredAct = filterByActivities.filter((c) => {
        return c.activities.find((c) => {
          return c.name === action.payload;
        });
      });

      if (action.payload === "All") 
        return {
          ...state,
          allCountries: filterByActivities,
        };
      } else {
        return {
          ...state,
          allCountries: filteredAct,
        };
      } */

      const allcountries = state.copyAllCountries;
      const value = action.payload;
      const filter = allcountries.filter((c) => {
        return c.Activities.some((a) => a.name === value);
      });
      return {
        ...state,
        allCountries: filter,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;

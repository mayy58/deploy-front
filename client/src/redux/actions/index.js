import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_NAME_COUNTRY,
  GET_DETAILS,
  FILTER_BY_CONTINENT,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  FILTER_BY_ACTIVITY,
  CLEAN_DETAIL,
} from "../../constantes/constantes";

export function getCountries() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/countries");
      return dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      alert("the API countries it doesnt work");
      console.log(error);
    }
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`/countries?name=${name}`);
      return dispatch({
        type: GET_NAME_COUNTRY,
        payload: result.data,
      });
    } catch (error) {
      alert("don't find the country");
      console.log(error);
    }
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    try {
      const resDetail = await axios.get(`/countries/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: resDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return { type: CLEAN_DETAIL };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

//es esta ruta quiero hacer el post del payload que me llega por front
export function createActivity(payload) {
  return async function (dispatch) {
    try {
      const newActivity = await axios.post("/activities/create", payload);
      const message = newActivity.data.message;
      alert(message);
      return newActivity;
    } catch (error) {
      console.log(error);
    }
  };
}
export function getActivities() {
  return async function (dispatch) {
    try {
      const allActivities = await axios.get("/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: allActivities.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterByActivity(activity) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
}

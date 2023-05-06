import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivities } from "../../redux/actions";
import { Link } from "react-router-dom";

import "./activities.styles.css";

function Activities() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.allActivities);

  return (
    <div className="activities">
      <div className="conteinerActivities">
        <h1>Activities</h1>
        {activities.map((act) => (
          <div key={act.id}>
            <h3>Activity: {act.name}</h3>
            <p>Difficulty level: {act.difficulty}</p>
            <p>Duration: {act.duration} hs.</p>
            <p>Season: {act.season}</p>
          </div>
        ))}
        <Link to="/home">
          <button className="button">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
export default Activities;

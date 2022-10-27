import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;
const Launch = () => {
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);
  const { loading, data, error } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  console.log("Loadong", loading);
  console.log("Data", data);
  console.log("LoadoErrorng", error);
  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <h1 className="display-4 my-3">
            <span className="text-dark">Mission:</span>
            {data.launch.mission_name}
          </h1>
          <h4 className="mb-3">Launch Details</h4>
          <ul className="list-group">
            <li className="list-group-item">
              Flight Number1: {data?.launch.flight_number}
            </li>
            <li className="list-group-item">
              Launch Year: {data?.launch.launch_year}
            </li>
            <li className="list-group-item">
              Launch Successful:{" "}
              <span
                className={classNames({
                  "text-success": data.launch.launch_success,
                  "text-danger": !data.launch.launch_success,
                })}
              >
                {data?.launch?.launch_successful ? "yes" : "No"}
              </span>
            </li>
          </ul>

          <h4 className="my-3">Rocket Details</h4>
          <ul className="list-group">
            <li className="list-group-item">
              Rocket Id:{data.launch.rocket.rocket_id}
            </li>
            <li className="list-group-item">
              Rocket Name:{data.launch.rocket.rocket_name}
            </li>
            <li className="list-group-item">
              Rocket Type:{data.launch.rocket.rocket_type}
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Launch;

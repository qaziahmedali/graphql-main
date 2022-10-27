import React from "react";
import { gql, useQuery } from "@apollo/client";
import LaunchItem from "./LaunchItem";
const LAUNCHES_QUERY = gql`
  query LaunchQuery {
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  console.log("Loading", loading);
  console.log("Data", data);
  console.log("Error", error);
  return (
    <>
      {loading ? (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        data.launches.map((launch, index) => (
          <>
            <LaunchItem key={launch.flight_number} launch={launch} />
          </>
        ))
      )}
    </>
  );
};

export default Launches;

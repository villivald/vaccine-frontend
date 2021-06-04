import React from "react";
import PropTypes from "prop-types";
import SolarArrivals from "./graphs/SolarArrivals";
import SolarUsage from "./graphs/SolarUsage";

const Solar = ({ vaccines, vaccinations, solarData }) => {
  const solar = vaccines.filter(
    (vaccine) => vaccine.vaccine === "SolarBuddhica"
  );

  const ids = solar.map((element) => element.id);

  const bottles = vaccinations.map((element) => element.sourceBottle);

  const intersection = ids.filter((element) =>
    bottles.includes(element)
  ).length;

  const injectionsMade = bottles.filter((element) =>
    ids.includes(element)
  ).length;

  const totalInjections =
    vaccines.filter((vaccine) => vaccine.vaccine === "SolarBuddhica").length *
    6;

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "15px" }}>
      <h1>SolarBuddhica</h1>
      <p>
        Used vaccine bottles: {intersection}/{solar.length} (6 injections per
        bottle)
      </p>
      <p>
        Used injections: {injectionsMade}/{totalInjections}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine arrivals by month</h3>
          <SolarArrivals solarData={solarData} />
        </div>

        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine usage by month</h3>
          <SolarUsage solarData={solarData} solar={solar} bottles={bottles} />
        </div>
      </div>
    </div>
  );
};

Solar.propTypes = {
  vaccines: PropTypes.array,
  solarData: PropTypes.array,
  vaccinations: PropTypes.array,
};

export default Solar;

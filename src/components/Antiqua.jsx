import React from "react";
import PropTypes from "prop-types";
import AntiquaArrivals from "./graphs/AntiquaArrivals";
import AntiquaUsage from "./graphs/AntiquaUsage";

const Antiqua = ({ vaccines, vaccinations, antiquaData }) => {
  const antiqua = vaccines.filter((vaccine) => vaccine.vaccine === "Antiqua");

  const ids = antiqua.map((element) => element.id);

  const bottles = vaccinations.map((element) => element.sourceBottle);

  const intersection = ids.filter((element) =>
    bottles.includes(element)
  ).length;

  const injectionsMade = bottles.filter((element) =>
    ids.includes(element)
  ).length;

  const totalInjections =
    vaccines.filter((vaccine) => vaccine.vaccine === "Antiqua").length * 6;

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "15px" }}>
      <h1>Antiqua</h1>
      <p>
        Used vaccine bottles: {intersection}/{antiqua.length} (6 injections per
        bottle)
      </p>
      <p>
        Used injections: {injectionsMade}/{totalInjections}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine arrivals by month</h3>
          <AntiquaArrivals antiquaData={antiquaData} />
        </div>

        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine usage by month</h3>
          <AntiquaUsage
            antiquaData={antiquaData}
            antiqua={antiqua}
            bottles={bottles}
          />
        </div>
      </div>
    </div>
  );
};

Antiqua.propTypes = {
  vaccines: PropTypes.array,
  antiquaData: PropTypes.array,
  vaccinations: PropTypes.array,
};

export default Antiqua;

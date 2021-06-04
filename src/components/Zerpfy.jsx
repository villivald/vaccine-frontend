import React from "react";
import PropTypes from "prop-types";
import ZerpfyArrivals from "./graphs/ZerpfyArrivals";
import ZerpfyUsage from "./graphs/ZerpfyUsage";

const Zerpfy = ({ vaccines, vaccinations, zerpfyData }) => {
  const zerpfy = vaccines.filter((vaccine) => vaccine.vaccine === "Zerpfy");

  const ids = zerpfy.map((element) => element.id);

  const bottles = vaccinations.map((element) => element.sourceBottle);

  const intersection = ids.filter((element) =>
    bottles.includes(element)
  ).length;

  const injectionsMade = bottles.filter((element) =>
    ids.includes(element)
  ).length;

  const totalInjections =
    vaccines.filter((vaccine) => vaccine.vaccine === "Zerpfy").length * 6;

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "15px" }}>
      <h1>Zerpfy</h1>
      <p>
        Used vaccine bottles: {intersection}/{zerpfy.length} (6 injections per
        bottle)
      </p>
      <p>
        Used injections: {injectionsMade}/{totalInjections}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine arrivals by month</h3>
          <ZerpfyArrivals zerpfyData={zerpfyData} />
        </div>

        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine usage by month</h3>
          <ZerpfyUsage
            zerpfyData={zerpfyData}
            zerpfy={zerpfy}
            bottles={bottles}
          />
        </div>
      </div>
    </div>
  );
};

Zerpfy.propTypes = {
  vaccines: PropTypes.array,
  zerpfyData: PropTypes.array,
  vaccinations: PropTypes.array,
};

export default Zerpfy;

import React from "react";
import TodayIcon from "@material-ui/icons/Today";
import MapIcon from "@material-ui/icons/Map";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PropTypes from "prop-types";
import LineChart from "./graphs/LineChart";
import BarChart from "./graphs/BarChart";
import HorizontalBarChart from "./graphs/HorizontalBarChart";
import PieChart from "./graphs/PieChart";
import PolarChart from "./graphs/PolarChart";
import RadarChart from "./graphs/RadarChart";

const Graphs = ({ vaccines, solarData, antiquaData, zerpfyData }) => {
  return (
    <div>
      <h2 className="topHeader">
        <TodayIcon />
        Vaccine Arrivals by Month
      </h2>
      <div className="graphsContainer">
        <LineChart
          solarData={solarData}
          antiquaData={antiquaData}
          zerpfyData={zerpfyData}
        />
        <BarChart
          solarData={solarData}
          antiquaData={antiquaData}
          zerpfyData={zerpfyData}
        />
      </div>

      <h2 className="topHeader">
        <AssessmentIcon />
        Vaccines Total
      </h2>
      <div className="graphsContainer">
        <PieChart vaccines={vaccines} />
        <PolarChart vaccines={vaccines} />
      </div>

      <h2 className="topHeader">
        <MapIcon />
        Vaccines by Health Districts
      </h2>
      <div className="graphsContainer">
        <HorizontalBarChart vaccines={vaccines} />
        <RadarChart vaccines={vaccines} />
      </div>
    </div>
  );
};

Graphs.propTypes = {
  vaccines: PropTypes.array,
  solarData: PropTypes.array,
  antiquaData: PropTypes.array,
  zerpfyData: PropTypes.array,
};

export default Graphs;

import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ vaccines }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];

  const vaccineAmountByType = (type) =>
    vaccines.filter((vaccine) => vaccine.vaccine === type).length;

  const vaccineDataByType = [
    vaccineAmountByType("SolarBuddhica"),
    vaccineAmountByType("Antiqua"),
    vaccineAmountByType("Zerpfy"),
  ];

  const data = {
    labels: ["SolarBuddhica", "Antiqua", "Zerpfy"],
    datasets: [
      {
        label: "%",
        data: vaccineDataByType,
        backgroundColor: [COLORS[0], COLORS[1], COLORS[2]],
        borderColor: [COLORS[0], COLORS[1], COLORS[2]],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: "60%" }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;

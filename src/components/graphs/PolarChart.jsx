import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarChart = ({ vaccines }) => {
  const COLORS = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
  ];

  const vaccinesByMonth = (month) => {
    return vaccines.filter((vaccine) =>
      vaccine.arrived.includes(`2021-${month}`)
    ).length;
  };

  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "#",
        data: [
          vaccinesByMonth("01"),
          vaccinesByMonth("02"),
          vaccinesByMonth("03"),
          vaccinesByMonth("04"),
        ],
        backgroundColor: [COLORS[0], COLORS[1], COLORS[2], COLORS[3]],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "60%" }}>
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart;

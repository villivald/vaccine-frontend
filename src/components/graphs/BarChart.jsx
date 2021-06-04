import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ solarData, antiquaData, zerpfyData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];
  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "SolarBuddhica",
        data: solarData,
        backgroundColor: COLORS[0],
      },
      {
        label: "Antiqua",
        data: antiquaData,
        backgroundColor: COLORS[1],
      },
      {
        label: "Zerpfy",
        data: zerpfyData,
        backgroundColor: COLORS[2],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div style={{ width: "90%" }}>
      {solarData[0] > 0 && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default BarChart;

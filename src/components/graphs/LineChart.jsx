import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ solarData, antiquaData, zerpfyData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        data: solarData,
        label: "SolarBuddhica",
        fill: false,
        backgroundColor: COLORS[0],
        borderColor: COLORS[0],
      },
      {
        data: antiquaData,
        label: "Antiqua",
        fill: false,
        backgroundColor: COLORS[1],
        borderColor: COLORS[1],
      },
      {
        data: zerpfyData,
        label: "Zerpfy",
        fill: false,
        backgroundColor: COLORS[2],
        borderColor: COLORS[2],
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
      {solarData[0] > 0 && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineChart;

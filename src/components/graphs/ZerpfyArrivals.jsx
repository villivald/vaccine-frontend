import React from "react";
import { Bar } from "react-chartjs-2";

const ZerpfyArrivals = ({ zerpfyData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26", "#12584f"];
  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        data: zerpfyData,
        backgroundColor: COLORS,
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
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
  };
  return (
    <div style={{ width: "100%" }}>
      {zerpfyData[0] > 0 && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default ZerpfyArrivals;

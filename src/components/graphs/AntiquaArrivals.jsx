import React from "react";
import { Bar } from "react-chartjs-2";

const AntiquaArrivals = ({ antiquaData }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26", "#12584f"];
  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        data: antiquaData,
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
      {antiquaData[0] > 0 && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default AntiquaArrivals;

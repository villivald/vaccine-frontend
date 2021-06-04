import React from "react";
import { Bar } from "react-chartjs-2";

const HorizontalBarChart = ({ vaccines }) => {
  const vaccinesInCurrentArea = (area) =>
    vaccines.filter((vaccine) => vaccine.healthCareDistrict === area).length;

  const vaccineDataByArea = [
    vaccinesInCurrentArea("HYKS"),
    vaccinesInCurrentArea("KYS"),
    vaccinesInCurrentArea("TAYS"),
    vaccinesInCurrentArea("TYKS"),
    vaccinesInCurrentArea("OYS"),
  ];

  const data = {
    labels: ["HYKS", "KYS", "TAYS", "TYKS", "OYS"],
    datasets: [
      {
        label: "Vaccines",
        data: vaccineDataByArea,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
  };
  return (
    <div style={{ width: "90%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;

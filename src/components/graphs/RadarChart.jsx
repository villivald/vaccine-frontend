import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ vaccines }) => {
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
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div style={{ width: "80%" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;

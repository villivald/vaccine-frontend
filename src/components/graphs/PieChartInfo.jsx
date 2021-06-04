import React from "react";
import { Pie } from "react-chartjs-2";

const PieChartInfo = ({ vaccinations }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];

  const vaccineChartDataByGender = [
    vaccinations.filter((vaccination) => vaccination.gender === "female")
      .length,
    vaccinations.filter((vaccination) => vaccination.gender === "male").length,
    vaccinations.filter((vaccination) => vaccination.gender === "nonbinary")
      .length,
  ];

  const data = {
    labels: ["Female", "Male", "Nonbinary"],
    datasets: [
      {
        label: "%",
        data: vaccineChartDataByGender,
        backgroundColor: [COLORS[0], COLORS[1], COLORS[2]],
        borderColor: [COLORS[0], COLORS[1], COLORS[2]],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: "90%", marginTop: "20px" }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChartInfo;

import React from "react";
import {
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import PropTypes from "prop-types";

const Solar = ({ vaccines, data, vaccinations }) => {
  const solar = vaccines.filter(
    (vaccine) => vaccine.vaccine === "SolarBuddhica"
  );

  const ids = solar.map((element) => element.id);

  const bottles = vaccinations.map((element) => element.sourceBottle);

  const intersection = ids.filter((element) =>
    bottles.includes(element)
  ).length;

  const injectionsMade = bottles.filter((element) =>
    ids.includes(element)
  ).length;

  const totalInjections =
    vaccines.filter((vaccine) => vaccine.vaccine === "SolarBuddhica").length *
    6;

  const intersectionByMonth = (month) =>
    solar
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`))
      .map((vaccine) => vaccine.id)
      .filter((vaccine) => bottles.includes(vaccine)).length;

  const dataByMonth = [
    {
      name: "January",
      used: intersectionByMonth("01"),
      unused: data[0]["SolarBhuddica"] - intersectionByMonth("01"),
    },
    {
      name: "February",
      used: intersectionByMonth("02"),
      unused: data[1]["SolarBhuddica"] - intersectionByMonth("02"),
    },
    {
      name: "March",
      used: intersectionByMonth("03"),
      unused: data[2]["SolarBhuddica"] - intersectionByMonth("03"),
    },
    {
      name: "April",
      used: intersectionByMonth("04"),
      unused: data[3]["SolarBhuddica"] - intersectionByMonth("04"),
    },
  ];

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "15px" }}>
      <h1>SolarBuddhica</h1>
      <p>
        Used vaccine bottles: {intersection}/{solar.length} (6 injections per
        bottle)
      </p>
      <p>
        Used injections: {injectionsMade}/{totalInjections}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine arrivals by month</h3>
          <BarChart width={450} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SolarBhuddica" fill="#8884d8" />
          </BarChart>
        </div>

        <div>
          <h3 style={{ textAlign: "center" }}>Vaccine usage by month</h3>
          <BarChart
            width={500}
            height={300}
            data={dataByMonth}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="used" stackId="a" fill="#458b47" />
            <Bar dataKey="unused" stackId="a" fill="crimson" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

Solar.propTypes = {
  vaccines: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  vaccinations: PropTypes.array.isRequired,
};

export default Solar;

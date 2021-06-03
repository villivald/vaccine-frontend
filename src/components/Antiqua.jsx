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

const Antiqua = ({ vaccines, data, vaccinations }) => {
  const antiqua = vaccines.filter((vaccine) => vaccine.vaccine === "Antiqua");

  const ids = antiqua.map((element) => element.id);

  const bottles = vaccinations.map((element) => element.sourceBottle);

  const intersection = ids.filter((element) =>
    bottles.includes(element)
  ).length;

  const injectionsMade = bottles.filter((element) =>
    ids.includes(element)
  ).length;

  const totalInjections =
    vaccines.filter((vaccine) => vaccine.vaccine === "Antiqua").length * 4;

  const intersectionByMonth = (month) =>
    antiqua
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`))
      .map((vaccine) => vaccine.id)
      .filter((vaccine) => bottles.includes(vaccine)).length;

  const dataByMonth = [
    {
      name: "January",
      used: intersectionByMonth("01"),
      unused: data[0]["Antiqua"] - intersectionByMonth("01"),
    },
    {
      name: "February",
      used: intersectionByMonth("02"),
      unused: data[1]["Antiqua"] - intersectionByMonth("02"),
    },
    {
      name: "March",
      used: intersectionByMonth("03"),
      unused: data[2]["Antiqua"] - intersectionByMonth("03"),
    },
    {
      name: "April",
      used: intersectionByMonth("04"),
      unused: data[3]["Antiqua"] - intersectionByMonth("04"),
    },
  ];

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "15px" }}>
      <h1>Antiqua</h1>
      <p>
        Used vaccine bottles: {intersection}/{antiqua.length} (4 injections per
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
            <Bar dataKey="Antiqua" fill="#41cf7c" />
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

Antiqua.propTypes = {
  vaccines: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  vaccinations: PropTypes.array.isRequired,
};

export default Antiqua;

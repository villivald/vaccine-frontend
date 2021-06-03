import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Treemap,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import TodayIcon from "@material-ui/icons/Today";
import MapIcon from "@material-ui/icons/Map";
import PropTypes from "prop-types";

const Graphs = ({ vaccines, data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];

  const vaccineAmountByType = (type) =>
    vaccines.filter((vaccine) => vaccine.vaccine === type).length;

  const vaccinesInCurrentArea = (area) =>
    vaccines.filter((vaccine) => vaccine.healthCareDistrict === area).length;

  const vaccineAmount = (area, month) => {
    return vaccines
      .filter((vaccine) => vaccine.healthCareDistrict === area)
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`)).length;
  };

  const vaccineDataByType = [
    {
      name: "SolarBuddhica",
      value: vaccineAmountByType("SolarBuddhica"),
    },
    {
      name: "Antiqua",
      value: vaccineAmountByType("Antiqua"),
    },
    {
      name: "Zerpfy",
      value: vaccineAmountByType("Zerpfy"),
    },
  ];

  const vaccineDataByArea = [
    {
      name: `HYKS - ${vaccinesInCurrentArea("HYKS")}`,
      value: vaccinesInCurrentArea("HYKS"),
    },
    {
      name: `KYS - ${vaccinesInCurrentArea("KYS")}`,
      value: vaccinesInCurrentArea("KYS"),
    },
    {
      name: `TAYS - ${vaccinesInCurrentArea("TAYS")}`,
      value: vaccinesInCurrentArea("TAYS"),
    },
    {
      name: `TYKS - ${vaccinesInCurrentArea("TYKS")}`,
      value: vaccinesInCurrentArea("TYKS"),
    },
    {
      name: `OYS - ${vaccinesInCurrentArea("OYS")}`,
      value: vaccinesInCurrentArea("OYS"),
    },
  ];

  const vaccineDataByAreaAndMonth = [
    {
      month: "January",
      HYKS: vaccineAmount("HYKS", "01"),
      KYS: vaccineAmount("KYS", "01"),
      TAYS: vaccineAmount("TAYS", "01"),
      TYKS: vaccineAmount("TYKS", "01"),
      OYS: vaccineAmount("OYS", "01"),
    },
    {
      month: "February",
      HYKS: vaccineAmount("HYKS", "02"),
      KYS: vaccineAmount("KYS", "02"),
      TAYS: vaccineAmount("TAYS", "02"),
      TYKS: vaccineAmount("TYKS", "02"),
      OYS: vaccineAmount("OYS", "02"),
    },
    {
      month: "March",
      HYKS: vaccineAmount("HYKS", "03"),
      KYS: vaccineAmount("KYS", "03"),
      TAYS: vaccineAmount("TAYS", "03"),
      TYKS: vaccineAmount("TYKS", "03"),
      OYS: vaccineAmount("OYS", "03"),
    },
    {
      month: "April",
      HYKS: vaccineAmount("HYKS", "04"),
      KYS: vaccineAmount("KYS", "04"),
      TAYS: vaccineAmount("TAYS", "04"),
      TYKS: vaccineAmount("TYKS", "04"),
      OYS: vaccineAmount("OYS", "04"),
    },
  ];

  return (
    <div>
      <h2 className="topHeader">
        <TodayIcon />
        Vaccine Arrivals by Month
      </h2>
      <div className="graphsContainer">
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="SolarBhuddica"
            stroke={COLORS[0]}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Antiqua"
            stroke={COLORS[1]}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Zerpfy"
            stroke={COLORS[2]}
            activeDot={{ r: 8 }}
          />
        </LineChart>

        <BarChart
          width={500}
          height={300}
          data={data}
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
          <Bar dataKey="SolarBhuddica" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="Antiqua" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="Zerpfy" stackId="a" fill={COLORS[2]} />
        </BarChart>

        <PieChart width={400} height={400}>
          <Pie
            data={vaccineDataByType}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={`${vaccineDataByType.value}`}
            outerRadius={80}
            dataKey="value"
          >
            {vaccineDataByType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="SolarBhuddica"
              stackId="1"
              stroke={COLORS[0]}
              fill={COLORS[0]}
            />
            <Area
              type="monotone"
              dataKey="Antiqua"
              stackId="1"
              stroke={COLORS[1]}
              fill={COLORS[1]}
            />
            <Area
              type="monotone"
              dataKey="Zerpfy"
              stackId="1"
              stroke={COLORS[2]}
              fill={COLORS[2]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h2 className="topHeader">
        <MapIcon />
        Vaccines by Health Districts
      </h2>
      <div className="areaGraphsContainer">
        <Treemap
          width={400}
          height={200}
          data={vaccineDataByArea}
          dataKey="value"
          ratio={4 / 3}
          stroke="#fff"
          fill={COLORS[0]}
        />
        <AreaChart
          width={500}
          height={400}
          data={vaccineDataByAreaAndMonth}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="HYKS"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="KYS"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="TAYS"
            stackId="1"
            stroke="#54b695"
            fill="#54b695"
          />
          <Area
            type="monotone"
            dataKey="TYKS"
            stackId="1"
            stroke="#14245a"
            fill="#14245a"
          />
          <Area
            type="monotone"
            dataKey="OYS"
            stackId="1"
            stroke="#a0562c"
            fill="#a0562c"
          />
        </AreaChart>
      </div>
    </div>
  );
};

Graphs.propTypes = {
  vaccines: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  vaccinations: PropTypes.array,
};

export default Graphs;

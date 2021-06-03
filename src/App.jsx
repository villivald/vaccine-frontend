/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Menu from "./components/Menu";
import About from "./components/About";
import VaccineList from "./components/VaccineList";
import VaccinationList from "./components/VaccinationList";
import Info from "./components/Info";
import Graphs from "./components/Graphs";
import Solar from "./components/Solar";
import Antiqua from "./components/Antiqua";
import Zerpfy from "./components/Zerpfy";
import vaccineService from "./services/vaccine";
import vaccinationService from "./services/vaccination";
import CurrentVaccine from "./components/CurrentVaccine";
import CurrentVaccination from "./components/CurrentVaccination";

const App = () => {
  const [vaccines, setVaccines] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const initialVaccines = await vaccineService.getAll();
      setVaccines(initialVaccines);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const initialVaccinations = await vaccinationService.getAll();
      setVaccinations(initialVaccinations);
    };
    fetchData();
  }, []);

  const vaccineAmount = (type, month) => {
    return vaccines
      .filter((vaccine) => vaccine.vaccine === type)
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`)).length;
  };

  const data = [
    {
      name: "January",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "01")}`,
      Antiqua: `${vaccineAmount("Antiqua", "01")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "01")}`,
    },
    {
      name: "February",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "02")}`,
      Antiqua: `${vaccineAmount("Antiqua", "02")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "02")}`,
    },
    {
      name: "March",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "03")}`,
      Antiqua: `${vaccineAmount("Antiqua", "03")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "03")}`,
    },
    {
      name: "April",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "04")}`,
      Antiqua: `${vaccineAmount("Antiqua", "04")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "04")}`,
    },
  ];

  const match = useRouteMatch("/vaccines/:id");
  const vaccine = match
    ? vaccines.find((vaccine) => vaccine.id === match.params.id)
    : null;

  const matchVaccination = useRouteMatch("/vaccinations/:id");
  const vaccination = matchVaccination
    ? vaccinations.find(
        (vaccination) =>
          vaccination["vaccination-id"] === matchVaccination.params.id
      )
    : null;

  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/solar">
          <Solar vaccines={vaccines} data={data} vaccinations={vaccinations} />
        </Route>
        <Route path="/antiqua">
          <Antiqua
            vaccines={vaccines}
            data={data}
            vaccinations={vaccinations}
          />
        </Route>
        <Route path="/zerpfy">
          <Zerpfy vaccines={vaccines} data={data} vaccinations={vaccinations} />
        </Route>
        <Route path="/vaccines/:id">
          <CurrentVaccine vaccine={vaccine} />
        </Route>
        <Route path="/vaccinations/:id">
          <CurrentVaccination vaccination={vaccination} vaccines={vaccines} />
        </Route>
        <Route path="/vaccinelist">
          <VaccineList vaccines={vaccines} vaccinations={vaccinations} />
        </Route>
        <Route path="/vaccinationlist">
          <VaccinationList vaccinations={vaccinations} vaccines={vaccines} />
        </Route>
        <Route path="/graphs">
          <Graphs vaccines={vaccines} data={data} />
        </Route>
        <Route path="/">
          <Info vaccines={vaccines} vaccinations={vaccinations} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

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

  const solarData = [
    vaccineAmount("SolarBuddhica", "01"),
    vaccineAmount("SolarBuddhica", "02"),
    vaccineAmount("SolarBuddhica", "03"),
    vaccineAmount("SolarBuddhica", "04"),
  ];
  const antiquaData = [
    vaccineAmount("Antiqua", "01"),
    vaccineAmount("Antiqua", "02"),
    vaccineAmount("Antiqua", "03"),
    vaccineAmount("Antiqua", "04"),
  ];
  const zerpfyData = [
    vaccineAmount("Zerpfy", "01"),
    vaccineAmount("Zerpfy", "02"),
    vaccineAmount("Zerpfy", "03"),
    vaccineAmount("Zerpfy", "04"),
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
          <Solar
            vaccines={vaccines}
            solarData={solarData}
            vaccinations={vaccinations}
          />
        </Route>
        <Route path="/antiqua">
          <Antiqua
            vaccines={vaccines}
            antiquaData={antiquaData}
            vaccinations={vaccinations}
          />
        </Route>
        <Route path="/zerpfy">
          <Zerpfy
            vaccines={vaccines}
            zerpfyData={zerpfyData}
            vaccinations={vaccinations}
          />
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
          <Graphs
            vaccines={vaccines}
            solarData={solarData}
            antiquaData={antiquaData}
            zerpfyData={zerpfyData}
          />
        </Route>
        <Route path="/">
          <Info vaccines={vaccines} vaccinations={vaccinations} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

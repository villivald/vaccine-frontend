import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import OpacityIcon from "@material-ui/icons/Opacity";
import InfoIcon from "@material-ui/icons/Info";

const Menu = () => {
  return (
    <div className="menuContainer">
      <p className="menuLink">
        <NavLink
          activeClassName="active"
          exact={true}
          to="/"
          style={{ display: "flex", gap: "5px" }}
        >
          <HomeIcon />
          Home
        </NavLink>
      </p>
      <p className="menuLink">
        <NavLink
          activeClassName="active"
          to="/graphs"
          style={{ display: "flex", gap: "5px" }}
          id="graphsLink"
        >
          <EqualizerIcon />
          Graphs
        </NavLink>
      </p>
      <p className="menuLink">
        <NavLink
          activeClassName="active"
          to="/vaccinelist"
          style={{ display: "flex", gap: "5px" }}
          id="vaccineListLink"
        >
          <LocalHospitalIcon />
          Vaccine List
        </NavLink>
      </p>
      <p className="menuLink">
        <NavLink
          activeClassName="active"
          to="/vaccinationlist"
          style={{ display: "flex", gap: "5px" }}
          id="vaccinationListLink"
        >
          <OpacityIcon />
          Vaccination List
        </NavLink>
      </p>
      <p className="menuLink">
        <NavLink
          activeClassName="active"
          to="/about"
          style={{ display: "flex", gap: "5px" }}
        >
          <InfoIcon />
          About
        </NavLink>
      </p>
    </div>
  );
};

export default Menu;

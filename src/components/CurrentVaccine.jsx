import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import vaccinePic from "../images/vaccine.svg";
import PropTypes from "prop-types";

const CurrentVaccine = ({ vaccine }) => {
  const history = useHistory();

  const routeChange = () => {
    history.goBack();
  };

  if (!vaccine) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
      className="currentVaccineContainer"
    >
      <img src={vaccinePic} height="150" />
      <Paper elevation={3} style={{ maxWidth: "50%" }}>
        <List>
          <ListItem>
            <ListItemText primary={`Order number: ${vaccine.orderNumber}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`ID: ${vaccine.id}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Responsible person: ${vaccine.responsiblePerson}`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Area: ${vaccine.healthCareDistrict}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Type: ${vaccine.vaccine}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Injections: ${vaccine.injections}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Arrived: ${new Date(vaccine.arrived).toLocaleString()}`}
            />
          </ListItem>
        </List>
      </Paper>
      <Button variant="contained" color="secondary" onClick={routeChange}>
        Go Back
      </Button>
    </div>
  );
};

CurrentVaccine.propTypes = {
  vaccine: PropTypes.object,
};

export default CurrentVaccine;

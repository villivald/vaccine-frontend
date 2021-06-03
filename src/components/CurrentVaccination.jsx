/* eslint-disable indent */
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import vaccinationPic from "../images/vaccination.svg";
import PropTypes from "prop-types";

const CurrentVaccination = ({ vaccination, vaccines }) => {
  const history = useHistory();

  const routeChange = () => {
    history.goBack();
  };

  if (!vaccination) {
    return null;
  }
  const vaccine = vaccines.filter(
    (vaccine) => vaccine.id === vaccination.sourceBottle
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
      className="currentVaccinationContainer"
    >
      <img src={vaccinationPic} height="150" />
      <Paper elevation={3} style={{ maxWidth: "40%" }}>
        <List>
          <ListItem>
            <ListItemText primary={`ID: ${vaccination["vaccination-id"]}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Source bottle: ${vaccination.sourceBottle}`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Gender: ${vaccination.gender}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Vaccination date:
        ${new Date(vaccination.vaccinationDate).toLocaleString()}`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Type: ${vaccine[0].vaccine}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Responsible person: ${vaccine[0].responsiblePerson}`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Area: ${vaccine[0].healthCareDistrict}`} />
          </ListItem>
        </List>
      </Paper>
      <Button variant="contained" color="secondary" onClick={routeChange}>
        Go Back
      </Button>
    </div>
  );
};

CurrentVaccination.propTypes = {
  vaccines: PropTypes.array.isRequired,
  vaccination: PropTypes.object,
};

export default CurrentVaccination;

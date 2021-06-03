/* eslint-disable indent */
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Vaccination = ({ vaccination, vaccines }) => {
  const vaccine = vaccines.filter(
    (vaccine) => vaccine.id === vaccination.sourceBottle
  );
  return (
    <TableRow key={vaccination["vaccination-id"]}>
      <TableCell>
        <Link
          id="vaccinationLink"
          to={`/vaccinations/${vaccination["vaccination-id"]}`}
        >
          {vaccination["vaccination-id"]}
        </Link>
      </TableCell>
      <TableCell>{vaccination.sourceBottle}</TableCell>
      <TableCell align="right">{vaccination.gender}</TableCell>
      <TableCell align="right">
        {new Date(vaccination.vaccinationDate).toLocaleDateString()}
      </TableCell>
      <TableCell
        align="right"
        style={{
          color:
            vaccine[0].vaccine === "Antiqua"
              ? "#82ca9d"
              : vaccine[0].vaccine === "Zerpfy"
              ? "#d84a26"
              : "#8884d8",
        }}
      >
        {vaccine[0].vaccine}
      </TableCell>
      <TableCell align="right">{vaccine[0].responsiblePerson}</TableCell>
      <TableCell align="right">{vaccine[0].healthCareDistrict}</TableCell>
    </TableRow>
  );
};

Vaccination.propTypes = {
  vaccines: PropTypes.array.isRequired,
  vaccination: PropTypes.object.isRequired,
};

export default Vaccination;

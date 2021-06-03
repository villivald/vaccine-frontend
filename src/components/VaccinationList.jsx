import React from "react";
import VaccinationListPagination from "./VaccinationListPagination";
import PropTypes from "prop-types";

const VaccinationList = ({ vaccinations, vaccines }) => {
  return (
    <div>
      <VaccinationListPagination rows={vaccinations} vaccines={vaccines} />
    </div>
  );
};

VaccinationList.propTypes = {
  vaccines: PropTypes.array.isRequired,
  vaccinations: PropTypes.array.isRequired,
};

export default VaccinationList;

import React from "react";
import VaccineListPagination from "./VaccineListPagination";
import PropTypes from "prop-types";

const VaccineList = ({ vaccines, vaccinations }) => {
  return (
    <div>
      <VaccineListPagination rows={vaccines} vaccinations={vaccinations} />
    </div>
  );
};

VaccineList.propTypes = {
  vaccines: PropTypes.array.isRequired,
  vaccinations: PropTypes.array.isRequired,
};

export default VaccineList;

/* eslint-disable indent */
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Switch,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  IconButton,
} from "@material-ui/core/";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import FilterListIcon from "@material-ui/icons/FilterList";
import PropTypes from "prop-types";
import Vaccine from "./Vaccine";
import vaccineListPic from "../images/vaccineList.svg";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
  },
  cell: {
    width: 150,
  },
});

const VaccineListPagination = ({ rows, vaccinations }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByVaccine, setSortByVaccine] = useState(false);
  const [sortByArea, setSortByArea] = useState(false);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  const handleAreaFilterChange = (event) => {
    setAreaFilter(event.target.value);
  };
  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };
  const handleNumberFilterChange = (event) => {
    setNumberFilter(event.target.value);
  };

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "150px",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "-20%",
          }}
        >
          <img src={vaccineListPic} height="150" />
          <h2 className="topHeader">
            <SortByAlphaIcon />
            Sort by
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          Date: <Switch onChange={() => setSortByDate(!sortByDate)} />
          Vaccine Type:{" "}
          <Switch onChange={() => setSortByVaccine(!sortByVaccine)} />
          Area: <Switch onChange={() => setSortByArea(!sortByArea)} />
        </div>
        <h2 className="topHeader">
          <FilterListIcon />
          Filter by
        </h2>
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div>
            <TextField
              id="filterNumber"
              label="ID"
              onChange={handleNumberFilterChange}
              placeholder="2145116d-7b2d..."
            />
          </div>
          <div>
            <TextField
              id="filterName"
              label="Name"
              onChange={handleNameFilterChange}
              placeholder="Jukka..."
            />
          </div>
          <div>
            <TextField
              id="filterArea"
              label="Area"
              onChange={handleAreaFilterChange}
              placeholder="HYKS..."
            />
          </div>
          <div>
            <TextField
              id="filterType"
              label="Vaccine Type"
              onChange={handleTypeFilterChange}
              placeholder="Antiqua..."
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Order Number</TableCell>
              <TableCell className={classes.cell}>ID</TableCell>
              <TableCell className={classes.cell}>Responsible Person</TableCell>
              <TableCell className={classes.cell}>Area</TableCell>
              <TableCell className={classes.cell}>Type</TableCell>
              <TableCell className={classes.cell}>Date</TableCell>
              <TableCell className={classes.cell}>Injections</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows
                  .filter((vaccine) =>
                    vaccine.responsiblePerson
                      .toLowerCase()
                      .includes(nameFilter.toLowerCase())
                  )
                  .filter((vaccine) =>
                    vaccine.id
                      .toLowerCase()
                      .includes(numberFilter.toLowerCase())
                  )
                  .filter((vaccine) =>
                    vaccine.healthCareDistrict
                      .toLowerCase()
                      .includes(areaFilter.toLowerCase())
                  )
                  .filter((vaccine) =>
                    vaccine.vaccine
                      .toLowerCase()
                      .includes(typeFilter.toLowerCase())
                  )
                  .sort((max, min) =>
                    sortByDate
                      ? new Date(max.arrived).getTime() -
                        new Date(min.arrived).getTime()
                      : max.orderNumber - min.orderNumber
                  )
                  .sort(
                    (a, b) => sortByVaccine && (a.vaccine > b.vaccine ? 1 : -1)
                  )
                  .sort(
                    (a, b) =>
                      sortByArea &&
                      (a.healthCareDistrict > b.healthCareDistrict ? 1 : -1)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((vaccine) => (
              <Vaccine
                key={vaccine.id}
                vaccine={vaccine}
                vaccinations={vaccinations}
              />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  50,
                  100,
                  500,
                  { label: "All", value: -1 },
                ]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

VaccineListPagination.propTypes = {
  rows: PropTypes.array.isRequired,
  vaccinations: PropTypes.array.isRequired,
};

export default VaccineListPagination;

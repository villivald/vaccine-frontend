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
import Vaccination from "./Vaccination";
import vaccinationListPic from "../images/vaccinationList.svg";

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
    minWidth: 500,
  },
});

const VaccinationListPagination = ({ rows, vaccines }) => {
  const [idFilter, setIdFilter] = useState("");
  const [bottleFilter, setBottleFilter] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByGender, setSortByGender] = useState(false);

  const handleIdFilterChange = (event) => {
    setIdFilter(event.target.value);
  };
  const handleBottleFilterChange = (event) => {
    setBottleFilter(event.target.value);
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
            gap: "100px",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "-18%",
          }}
        >
          <img src={vaccinationListPic} height="150" />
          <h2 className="topHeader">
            <SortByAlphaIcon />
            Sort by
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          Date: <Switch onChange={() => setSortByDate(!sortByDate)} />
          Gender: <Switch onChange={() => setSortByGender(!sortByGender)} />
        </div>

        <h2 className="topHeader">
          <FilterListIcon />
          Filter by
        </h2>
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <div>
            <TextField
              label="Vaccination ID"
              onChange={handleIdFilterChange}
              placeholder="6ae207d9-6fa9-4b62..."
              id="filterId"
            />
          </div>
          <div>
            <TextField
              label="Source Bottle"
              onChange={handleBottleFilterChange}
              placeholder="75ae9638-3ad5-4433..."
              id="filterBottle"
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Vaccination ID</TableCell>
              <TableCell>Source Bottle</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Responsible Person</TableCell>
              <TableCell align="right">Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows
                  .filter((vaccine) =>
                    vaccine["vaccination-id"].includes(idFilter)
                  )
                  .filter((vaccine) =>
                    vaccine.sourceBottle.includes(bottleFilter)
                  )
                  .sort((max, min) => max.vaccinationDate - min.vaccinationDate)
                  .sort(
                    (max, min) =>
                      sortByDate &&
                      new Date(max.vaccinationDate).getTime() -
                        new Date(min.vaccinationDate).getTime()
                  )
                  .sort(
                    (a, b) => sortByGender && (a.gender > b.gender ? 1 : -1)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((vaccination) => (
              <Vaccination
                key={vaccination["vaccination-id"]}
                vaccination={vaccination}
                vaccines={vaccines}
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
                colSpan={4}
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

VaccinationListPagination.propTypes = {
  vaccines: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default VaccinationListPagination;

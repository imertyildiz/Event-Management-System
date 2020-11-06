import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import LocationOnIcon from '@material-ui/icons/LocationOn';
export default function TableContent(props) {

  let iconMap = {
    "update": <CreateIcon/>,
    "delete": <DeleteIcon/>,
    "addKatilimci": <AddIcon/>,
    "showKatilimci": <AddIcon/>,
    "map" : <LocationOnIcon/>
  }


  return (
    <TableBody>
      {getRowSlice().map(row => createTableRow(row))}
    </TableBody>

  );

  function getRowSlice() {
    return props
      .rows
      .slice(calculatePageBeginning(), calculatePageEnd());
  }

  function calculatePageBeginning() {
    return props.page * props.rowsPerPage;
  }

  function calculatePageEnd() {
    return props.page * props.rowsPerPage + props.rowsPerPage;
  }


  function createTableRow(row) {
    return (
      <TableRow hover role="checkbox" key={row.etkinlikAdi}>
        {props.columns.map(column => createTableCell(column, row))}
      </TableRow>
    );
  }

  function createTableCell(column, row) {

    let cellValue = row[column.id];
    if (column.id === "update" || column.id === "delete" || column.id === "addKatilimci" || column.id === "showKatilimci" || column.id === "map") {
      cellValue = createIcon(column.id, column.onClick, row.etkinlikAdi);
    }

    return (
      <TableCell key={column.id} align={column.align}>
        {cellValue}
      </TableCell>
    );
  }

  function createIcon(key, onClick, etkinlikAdi) {
    return (
      <IconButton aria-label={key} color="primary" onClick={() => onClick(etkinlikAdi)}>
        {iconMap[key]}
      </IconButton>
    )
  }

}
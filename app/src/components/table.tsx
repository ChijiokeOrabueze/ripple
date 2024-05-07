"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "./button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TableColumn<T> = {
  accessor: keyof T;
  value: string;
};

type ActionColumn<T> = {
  value: string;
  name: string;
  action: (data: T) => void;
};

export interface TableProps<T, Row = { [key in keyof T]: string | number }> {
  columns: TableColumn<T>[];
  rows: Row[];
  actionColumns?: ActionColumn<Row>[];
}

export function Table<T>({ columns, rows, actionColumns }: TableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="border">
          <TableRow>
            {columns.map(({ value }) => (
              <StyledTableCell key={value}>{value}</StyledTableCell>
            ))}
            {actionColumns?.map(({ value }) => (
              <StyledTableCell key={value}>{value}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map(({ accessor }, colIndex) => (
                <StyledTableCell key={colIndex} scope="row">
                  {row[accessor]}
                </StyledTableCell>
              ))}
              {actionColumns?.map(({ value, name, action }, actionIndex) => (
                <StyledTableCell key={actionIndex} scope="row">
                  <Button onClick={() => action(row)}>{name}</Button>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

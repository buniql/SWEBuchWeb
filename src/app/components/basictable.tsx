"use client";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Buch } from "@/gql/graphql";
import getBuecher from "../query";

//Format der Tabelle/Zeilen
function createData(
  id: string,
  version: number,
  isbn: string,
  rating: number,
  lieferbar: boolean,
  datum: string,
  homepage: string,
  schlagwoerter: string,
  art: string,
  titel: string
) {
  return {
    id,
    version,
    isbn,
    rating,
    lieferbar,
    datum,
    homepage,
    schlagwoerter,
    art,
    titel,
  };
}

export default function BasicTable() {
  let [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buecherList: Buch[] = await getBuecher();

        const mappedRows = buecherList.map((buch) =>
          createData(
            buch.id,
            buch.version,
            buch.isbn,
            buch.rating ? buch.rating : 0,
            buch.lieferbar ? buch.lieferbar : false,
            buch.datum ? buch.datum : "N/A",
            buch.homepage ? buch.homepage : "N/A",
            buch.schlagwoerter ? buch.schlagwoerter.join(",") : "N/A",
            buch.art ? buch.art : "N/A",
            buch.titel.titel
          )
        );

        setRows(mappedRows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Version</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Lieferbar</TableCell>
            <TableCell align="right">Datum</TableCell>
            <TableCell align="right">Homepage</TableCell>
            <TableCell align="right">Schlagwörter</TableCell>
            <TableCell align="right">Art</TableCell>
            <TableCell align="right">Titel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.version}</TableCell>
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.lieferbar}</TableCell>
              <TableCell align="right">{row.datum}</TableCell>
              <TableCell align="right">{row.homepage}</TableCell>
              <TableCell align="right">{row.schlagwoerter}</TableCell>
              <TableCell align="right">{row.art}</TableCell>
              <TableCell align="right">{row.titel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

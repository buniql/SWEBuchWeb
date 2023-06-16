"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Buch } from "@/gql/graphql";
import getBuecher from "../model/BuchQuery";

interface DataTableProps {
  search: string;
}

// Format der Tabelle/Spalten
function createRow(
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

// Spalten anordnen, Werte zuweisen, Größe festlegen
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "version", headerName: "Version", width: 100 },
  { field: "titel", headerName: "Titel", width: 100 },
  { field: "isbn", headerName: "ISBN", width: 150 },
  { field: "rating", headerName: "Rating", width: 100 },
  { field: "lieferbar", headerName: "Lieferbar", width: 100 },
  { field: "datum", headerName: "Datum", width: 100 },
  { field: "homepage", headerName: "Homepage", width: 200 },
  { field: "schlagwoerter", headerName: "Schlagwörter", width: 200 },
  { field: "art", headerName: "Art", width: 200 },
];

// DataTable Komponente
const DataTable: React.FC<DataTableProps> = ({ search }) => {
  // useState als Ausgangspunkt für die asynchrone Abfrage der Daten
  const [rows, setRows] = useState<any[]>([]);

  // useEffect um den Seiteninhalt in Abhängigkeit zum Suchanfragen-String zu erhalten
  useEffect(() => {
    console.log("Fetch new Data");
    const fetchData = async () => {
      try {
        // Bücher mittels GraphQL asynchron laden
        const buecherList: Buch[] = await getBuecher(search);

        // erhaltene Bücher mappen
        const mappedRows = buecherList.map((buch) =>
          createRow(
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

        // Tabellen Daten setzen
        setRows(mappedRows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataTable;

"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Buch } from "@/gql/graphql";
import getBuecher from "../model/BuchQuery";

interface DataTableProps {
  search: string;
  selectedCheckboxes: string[];
}

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

// DataTable um die Daten von Buchern anzuzeigen
const DataTable: React.FC<DataTableProps> = ({
  search,
  selectedCheckboxes,
}) => {
  // useState als Ausgangspunkt für die asynchrone Abfrage der Daten
  const [rows, setRows] = useState<any[]>([]);

  // useEffect um den Seiteninhalt in Abhängigkeit zum Suchanfragen-String und Parameter-Checkboxen zu erhalten
  useEffect(() => {
    console.log("Fetch new Data");
    const fetchData = async () => {
      try {
        // Spalten sind id, version und die selektierten Parameter
        const selectedColumnsArray = [
          "id",
          "version",
          ...selectedColumns.map((column) => column.field),
        ];

        // für GraphQL: wenn nach "titel", dann  "titel { titel }"
        if (selectedColumnsArray.includes("titel")) {
          const index = selectedColumnsArray.indexOf("titel");
          selectedColumnsArray[index] = "titel { titel }";
        }

        // Bücher mittels GraphQL asynchron laden
        const buecherList: Buch[] = await getBuecher(
          search,
          selectedColumnsArray
        );

        // Werte der erhaltenen Bücher mappen
        const mappedRows = buecherList.map((buch) => {
          const row: any = {
            id: buch.id,
            version: buch.version,
            titel: buch.titel.titel,
          };
          selectedCheckboxes.forEach((checkbox) => {
            switch (checkbox) {
              case "ISBN":
                row.isbn = buch.isbn;
                break;
              case "Rating":
                row.rating = buch.rating ? buch.rating : 0;
                break;
              case "Lieferbar":
                row.lieferbar = buch.lieferbar ? buch.lieferbar : false;
                break;
              case "Datum":
                row.datum = buch.datum ? buch.datum : "N/A";
                break;
              case "Homepage":
                row.homepage = buch.homepage ? buch.homepage : "N/A";
                break;
              case "Schlagwörter":
                row.schlagwoerter = buch.schlagwoerter
                  ? buch.schlagwoerter
                  : "N/A";
                break;
              case "Art":
                row.art = buch.art ? buch.art : "N/A";
                break;
              default:
                break;
            }
          });
          return row;
        });

        setRows(mappedRows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCheckboxes]);

  // Spalten Daten, Namen und Größe festlegen
  const allColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "version", headerName: "Version", width: 100 },
    { field: "titel", headerName: "Titel", width: 100 },
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "lieferbar", headerName: "Lieferbar", width: 150 },
    { field: "datum", headerName: "Datum", width: 150 },
    { field: "homepage", headerName: "Homepage", width: 150 },
    { field: "schlagwoerter", headerName: "Schlagwörter", width: 150 },
    { field: "art", headerName: "Art", width: 150 },
  ];

  const selectedColumns = allColumns.filter((column) => {
    return (
      column.field === "id" ||
      column.field === "version" ||
      (column.headerName && selectedCheckboxes.includes(column.headerName))
    );
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={selectedColumns} />
    </div>
  );
};

export default DataTable;

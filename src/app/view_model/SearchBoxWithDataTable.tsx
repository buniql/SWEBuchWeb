"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";

export default function SearchBoxWithDataTable() {
  const [searchQuery, setSearchQuery] = useState(""); // Zustand für die Suchanfrage

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value); // Funktion zur Sucheingabe
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearchInputChange} />
      </div>
      <div style={{ flex: "1" }}>
        <DataTable search={searchQuery} />
      </div>
    </div>
  );
}

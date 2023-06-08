"use client";
import { useState } from "react";
import SearchBar from "./searchbar";
import DataTable from "./basictable";

export default function SearchBoxWithDataTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    console.log(value);
    //bis hier funktioniert alles korrekt
    //DataTable soll neu geladen werden -> veränderte Daten geladen
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchInputChange} />
      <DataTable search={searchQuery} />
    </div>
  );
}

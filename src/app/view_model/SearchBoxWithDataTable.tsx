"use client";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MediaCardGrid from "../components/MediaCard";

export default function SearchBoxWithDataTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    console.log(value);
    // bis hier funktioniert alles korrekt
    // DataTable soll neu geladen werden -> veränderte Daten geladen
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearchInputChange} />
      </div>
      <div style={{ flex: "1" }}>
        <MediaCardGrid search={searchQuery} />
      </div>
    </div>
  );
}

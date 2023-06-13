"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import MediaCardGrid from "./MediaCard";

export default function SearchBoxWithMediaCards() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
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

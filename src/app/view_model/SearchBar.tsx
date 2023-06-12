"use client";
import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onSearch(value);
  };

  return <TextField label="Suche" onChange={handleInputChange} />;
};

export default SearchBar;

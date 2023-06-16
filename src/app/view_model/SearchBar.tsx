"use client";
import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  onSearch: (value: string) => void; // Funktion, die aufgerufen wird, wenn sich die Sucheingabe ändert
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; // Wert der Eingabe aus dem Event extrahieren
    onSearch(value); // Aufrufen der onSearch-Funktion mit dem neuen Suchbegriff
  };

  return <TextField label="Suche" onChange={handleInputChange} />; // Textfeld-Komponente Label "Suche"
};

export default SearchBar;

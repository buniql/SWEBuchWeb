"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const checkboxValues = [
  "Titel",
  "ISBN",
  "Rating",
  "Lieferbar",
  "Datum",
  "Homepage",
  "Schlagwörter",
  "Art",
];

export default function SearchBoxWithDataTable() {
  const [searchQuery, setSearchQuery] = useState(""); // Zustand für die Suchanfrage
  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<string[]>(checkboxValues); // Zustand für die Checkboxen
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Zustand für das Burger Menü

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value); // Funktion zur Sucheingabe
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((checkbox) => checkbox !== value)
      );
    }
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearchInputChange} />
      </div>
      <div>
        <IconButton onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={document.getElementById("checkbox-menu")}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {checkboxValues.map((value) => (
            <MenuItem key={value}>
              <Checkbox
                value={value}
                checked={selectedCheckboxes.includes(value)}
                onChange={handleCheckboxChange}
                sx={{ fontFamily: "Arial" }}
              />
              {value}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div style={{ flex: "1" }}>
        <DataTable
          search={searchQuery}
          selectedCheckboxes={selectedCheckboxes}
        />
      </div>
    </div>
  );
}

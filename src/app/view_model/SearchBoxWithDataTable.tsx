"use client";
import { useContext, useState } from "react";
import DataTable from "./DataTable";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchContext } from "../SearchContext";

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
  const searchValue = useContext(SearchContext);

  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<string[]>(checkboxValues); // Zustand für die Checkboxen
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Zustand für das Burger Menü

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
      <div>
        <IconButton onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        {isMenuOpen && (
          <Menu
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 0, left: 0 }}
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
        )}
      </div>
      <div style={{ flex: "1" }}>
        <DataTable
          search={searchValue?.searchValue}
          selectedCheckboxes={selectedCheckboxes}
        />
      </div>
    </div>
  );
}

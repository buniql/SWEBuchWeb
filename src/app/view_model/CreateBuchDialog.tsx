"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Art,
  BuchInput,
  InputMaybe,
  Maybe,
  Scalars,
  Titel,
} from "@/gql/graphql";
import writeBuch from "../model/BuchMutation";
import { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { Alert } from "@mui/material";


interface BuchFormDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function BuchForm({ open, onClose }: BuchFormDialogProps) {
  const [errorText, setErrorText] = useState<string | null>(null);

  

  // Zustände der einzelnen Eingabeobjekte
  const [isbn, setIsbn] = React.useState<string>("");
  const [rating, setRating] = React.useState<number | null>(null);
  const [art, setArt] = React.useState<Maybe<Art>>(null);
  const [preis, setPreis] =
    React.useState<InputMaybe<Scalars["Float"]["input"]>>(1);
  const [rabatt, setRabatt] =
    React.useState<InputMaybe<Scalars["Float"]["input"]>>(0);
  const [lieferbar, setLieferbar] = React.useState<boolean>(false);
  const [datum, setDatum] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [homepage, setHomepage] = React.useState<string>("");
  const [schlagwoerter, setSchlagwoerter] = React.useState<string[]>([]);
  const [titel, setTitel] = React.useState<Titel>({
    titel: "",
    untertitel: "",
  });

  const handleSend = async () => {
    // Daten aus dem Formular sammeln
    const formData: BuchInput = {
      isbn,
      rating,
      art,
      preis,
      rabatt,
      lieferbar,
      datum,
      homepage,
      schlagwoerter,
      titel,
    };
    console.log(formData);

    // GraphQL Mutation zum Buch anlegen anstoßen
    try {
      await writeBuch(formData);
      window.location.reload();
      handleClose();
    } catch (error) {
      setErrorText("" + error);
    }
  };

  const handleClose = () => {
    setErrorText(null);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    // Formular zurücksetzen
    setIsbn("");
    setRating(null);
    setArt(null);
    setPreis(1);
    setRabatt(0);
    setLieferbar(false);
    setDatum(new Date().toISOString().split("T")[0]);
    setHomepage("");
    setSchlagwoerter([]);
    setTitel({
      titel: "",
      untertitel: "",
    });
  };

  // Handler die bei Aktualisierung der Daten die Zustände verändern
  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value !== "" ? Number(event.target.value) : null;
    setRating(value);
  };

  const handleArtChange = (event: SelectChangeEvent<Art>) => {
    setArt(event.target.value as Maybe<Art>);
  };

  const handlePreisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreis(Number(event.target.value));
  };

  const handleRabattChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;
    if (value > 1) value = 1;
    setRabatt(value);
  };

  const handleLieferbarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLieferbar(event.target.checked);
  };

  const handleDatumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatum(event.target.value);
  };

  const handleHomepageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomepage(event.target.value);
  };

  const handleSchlagwoerterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = event.target.value.split(",").map((value) => value.trim());
    setSchlagwoerter(values);
  };

  const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitel((prevTitel) => ({
      ...prevTitel,
      titel: event.target.value,
    }));
  };

  const handleUntertitelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitel((prevTitel) => ({
      ...prevTitel,
      untertitel: event.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
            {errorText && <Alert severity="error">{errorText}</Alert>}

      <DialogContent>
        <TextField
          label="Titel"
          value={titel.titel}
          onChange={handleTitelChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Untertitel"
          value={titel.untertitel}
          onChange={handleUntertitelChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="ISBN"
          value={isbn}
          onChange={handleIsbnChange}
          fullWidth
          required
          margin="dense"
          helperText="bspw: 978-0-321-19368-1"
        />
        <Rating
          name="rating"
          value={rating || 0}
          precision={1}
          onChange={(event, value) => setRating(value)}
          size="large"
          max={5}
          style={{ fontSize: 36 }}
        />
        <FormLabel component="legend">Art</FormLabel>
        <RadioGroup
          aria-label="art"
          name="art"
          value={art || ""}
          onChange={handleArtChange}
          row
        >
          <FormControlLabel
            value={Art.Druckausgabe}
            control={<Radio />}
            label="DRUCKAUSGABE"
          />
          <FormControlLabel
            value={Art.Kindle}
            control={<Radio />}
            label="KINDLE"
          />
        </RadioGroup>
        <TextField
          type="number"
          label="Preis"
          value={preis}
          onChange={handlePreisChange}
          fullWidth
          required
          margin="dense"
          helperText="Der Preis muss größer als 0 sein"
          inputProps={{
            step: 10,
            min: 0,
          }}
        />
        <TextField
          type="number"
          label="Rabatt"
          value={rabatt}
          onChange={handleRabattChange}
          fullWidth
          required
          margin="dense"
          helperText="Der Rabatt muss >= 0 und <= 1 sein"
          inputProps={{
            step: 0.01,
            min: 0,
            max: 1,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={lieferbar}
              onChange={handleLieferbarChange}
              name="lieferbar"
              color="primary"
            />
          }
          label="Lieferbar"
        />
        <TextField
          label="Datum"
          value={datum}
          onChange={handleDatumChange}
          fullWidth
          required
          margin="dense"
          helperText="Das Datum muss das Format yyyy-dd-mm besitzen"
        />
        
        <TextField
          label="Homepage"
          value={homepage}
          onChange={handleHomepageChange}
          fullWidth
          required
          margin="dense"
          helperText="bspw: https://buch.erstellen"
        />
        <TextField
          label="Schlagwörter"
          value={schlagwoerter.join(", ")}
          onChange={handleSchlagwoerterChange}
          fullWidth
          margin="dense"
          helperText="Durch Kommas getrennt, bspw: JAVASCRIPT, TYPESCRIPT"
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Abbrechen
        </Button>
        <Button onClick={handleSend} color="primary">
          Absenden
        </Button>
      </DialogActions>
    </Dialog>
  );
}

"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Art,
  Buch,
  BuchInput,
  InputMaybe,
  Maybe,
  Scalars,
  Titel,
} from "@/gql/graphql";
import writeBuch from "../model/BuchMutation";

export default function BuchForm() {
  const [isbn, setIsbn] = React.useState<string>("");
  const [rating, setRating] = React.useState<number | null>(null);
  const [art, setArt] = React.useState<Maybe<Art>>(null);
  const [preis, setPreis] =
    React.useState<InputMaybe<Scalars["Float"]["input"]>>();
  const [rabatt, setRabatt] =
    React.useState<InputMaybe<Scalars["Float"]["input"]>>();
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
    setRabatt(Number(event.target.value));
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Do something with the form data
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

    writeBuch(formData);

    console.log(formData);

    // Reset the form
    setIsbn("");
    setRating(null);
    setArt(null);
    setPreis(0);
    setRabatt(undefined);
    setLieferbar(false);
    setDatum(new Date().toISOString().split("T")[0]);
    setHomepage("");
    setSchlagwoerter([]);
    setTitel({
      titel: "",
      untertitel: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Titel"
          value={titel.titel}
          onChange={handleTitelChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Untertitel"
          value={titel.untertitel}
          onChange={handleUntertitelChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ISBN"
          value={isbn}
          onChange={handleIsbnChange}
          fullWidth
          required
          margin="normal"
          helperText="bspw: 978-0-321-19368-1"
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Rating
            name="rating"
            value={rating || 0}
            precision={0.5}
            onChange={(event, value) => setRating(value)}
            size="large"
            max={5}
            sx={{ marginTop: "8px" }}
            style={{ fontSize: 36 }}
          />
        </Box>
        <FormControl fullWidth required margin="normal">
          <InputLabel id="art-label">Art</InputLabel>
          <Select
            labelId="art-label"
            id="art"
            value={art || ""}
            onChange={handleArtChange}
          >
            <MenuItem value={Art.Druckausgabe}>DRUCKAUSGABE</MenuItem>
            <MenuItem value={Art.Kindle}>KINDLE</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Preis"
          value={preis}
          onChange={handlePreisChange}
          fullWidth
          required
          margin="normal"
          helperText="Der Preis muss größer >= 0 sein"
        />
        <TextField
          label="Rabatt"
          value={rabatt}
          onChange={handleRabattChange}
          fullWidth
          required
          margin="normal"
          helperText="Der Rabatt muss >= 0 und <= 1 sein"
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        </Box>
        <TextField
          label="Datum"
          value={datum}
          onChange={handleDatumChange}
          fullWidth
          required
          margin="normal"
          helperText="Das Datum muss das Format yyyy-dd-mm besitzen"
        />
        <TextField
          label="Homepage"
          value={homepage}
          onChange={handleHomepageChange}
          fullWidth
          required
          margin="normal"
          helperText="bspw: https://buch.erstellen"
        />
        <TextField
          label="Schlagwörter"
          value={schlagwoerter.join(", ")}
          onChange={handleSchlagwoerterChange}
          fullWidth
          margin="normal"
          helperText="Durch Kommas getrennt, bspw: JAVASCRIPT, TYPESCRIPT"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}

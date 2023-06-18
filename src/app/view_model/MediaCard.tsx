"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { Buch } from "@/gql/graphql";
import getBuecher from "../model/BuchQuery";

interface MediaCardProps {
  buch: Buch;
}

// MediaCard um die Daten eines Buches anzuzeigen
const MediaCard: React.FC<MediaCardProps> = ({ buch }) => {
  // Deconstruction um die für die Anzeige relevanten Werte zu erhalten
  const { id, titel, isbn, rating, lieferbar, datum, homepage } = buch;

  return (
    <Grid item>
      <Card sx={{ width: 260 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/buchbackground.jpg"
          title={titel.titel}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titel.titel}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div>{isbn}</div>
            <div>
              <Rating name="rating" value={rating} precision={0.5} readOnly />
            </div>
            <div>Lieferbar: {lieferbar ? "Ja" : "Nein"}</div>
            <div>Datum: {datum}</div>
            {homepage && (
              <div>
                Homepage:{" "}
                <a href={homepage} style={{ color: "#3366CC" }}>
                  {homepage}
                </a>
              </div>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

// für MediaCard benötigte Properties zur Übergabe an GraphQL -> nicht overfetchen
const mediaCardProperties: string[] = [
  "isbn",
  "rating",
  "lieferbar",
  "datum",
  "homepage",
  "titel { titel }",
];

// MediaCardGrid Komponente
export default function MediaCardGrid({ search }: { search: string }) {
  // useState als Ausgangspunkt für die asynchrone Abfrage der Daten
  const [buecherList, setBuecherList] = React.useState<Buch[]>([]);

  // useEffect um den Seiteninhalt in Abhängigkeit zum Suchanfragen-String zu erhalten
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Bücher mittels GraphQL asynchron laden
        const buecherList: Buch[] = await getBuecher(
          search,
          mediaCardProperties
        );

        // erhaltene Bücher setzen
        setBuecherList(buecherList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <Grid container spacing={2}>
      {buecherList.map((buch) => (
        <MediaCard key={buch.id} buch={buch} />
      ))}
    </Grid>
  );
}

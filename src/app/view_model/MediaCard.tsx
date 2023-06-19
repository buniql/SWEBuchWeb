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
import Link from "next/link";

interface MediaCardProps {
  buch: Buch;
}

// MediaCard um die Daten eines Buches anzuzeigen
const MediaCard: React.FC<MediaCardProps> = ({ buch }) => {
  // Deconstruction um die für die Anzeige relevanten Werte zu erhalten
  const { id, titel, isbn, rating, lieferbar, datum, homepage } = buch;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px 16px 16px 16px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ height: 0, paddingTop: "56.25%" }}
          image="/buchbackground.jpg"
          title={titel.titel}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titel.titel}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isbn}
          </Typography>
          <Rating name="rating" value={rating} precision={1} readOnly />

          <Typography variant="body2" color="text.secondary">
            Lieferbar: {lieferbar ? "Ja" : "Nein"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datum: {datum}
          </Typography>
          {homepage && (
            <Typography variant="body2" color="text.secondary">
              Homepage:{" "}
              <Link href={homepage} color="#3366CC">
                {homepage}
              </Link>
            </Typography>
          )}
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
        <MediaCard key={buch.isbn} buch={buch} />
      ))}
    </Grid>
  );
}

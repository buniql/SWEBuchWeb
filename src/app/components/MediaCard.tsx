"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { Buch } from "@/gql/graphql";
import getBuecher from "../query";

interface MediaCardProps {
  buch: Buch;
}

const MediaCard: React.FC<MediaCardProps> = ({ buch }) => {
  const { id, titel, isbn, rating, lieferbar, datum, homepage } = buch;

  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <Card sx={{ width: 240 }}>
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
            <div>Homepage: {homepage}</div>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default function MediaCardGrid({ search }: { search: string }) {
  const [buecherList, setBuecherList] = React.useState<Buch[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const buecherList: Buch[] = await getBuecher(search);
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

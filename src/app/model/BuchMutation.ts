import { BuchInput } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { getCookie } from "cookies-next";

// Apollo Client konfiguration
const client = new ApolloClient({
  uri: process.env.API_URI,
});

// GraphQL Mutation zum Erstellen eines Buchs
const writeBuch = async (buch: BuchInput) => {
  // GraphQL-Mutationsabfrage zum Erstellen eines Buchs
  const createBuchMutation = gql`
    mutation CreateBuch($buchInput: BuchInput!) {
      create(input: $buchInput)
    }
  `;

  // Authentifizierungs-Token holen
  const authCookie = getCookie("auth");

  try {
    // Senden der Mutation an den Backend-Server
    const response = await client.mutate({
      mutation: createBuchMutation,
      variables: {
        buchInput: {
          isbn: buch.isbn,
          rating: buch.rating,
          art: buch.art,
          preis: buch.preis,
          rabatt: buch.rabatt,
          lieferbar: buch.lieferbar,
          datum: buch.datum,
          homepage: buch.homepage,
          schlagwoerter: buch.schlagwoerter,
          titel: {
            titel: buch.titel.titel,
            untertitel: buch.titel.untertitel,
          },
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${authCookie}`, // Token dem Header Daten hinzufügen
        },
      },
    });

    const createdBuchId = response.data.create.id;
    console.log("Buch erstellt:", createdBuchId);
  } catch (error) {
    console.log("Error creating book:", error);
  }
};

export default writeBuch;

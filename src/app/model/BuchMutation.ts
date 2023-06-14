import { BuchInput } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { getCookie } from "cookies-next";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
});

const writeBuch = async (buch: BuchInput, token: string) => {
  const createBuchMutation = gql`
    mutation CreateBuch($input: BuchInput!) {
      create(input: $input) {
        id
        isbn
        rating
        art
        preis
        rabatt
        lieferbar
        datum
        homepage
        schlagwoerter
        titel {
          titel
          untertitel
        }
      }
    }
  `;

  const authCookie = getCookie("key");

  try {
    const response = await client.mutate({
      mutation: createBuchMutation,
      variables: {
        input: {
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
          authorization: `Bearer ${authCookie}`, // Include the token in the headers
        },
      },
    });

    const createdBuchId = response.data.create.id;
    console.log("Buch erstellt:", createdBuchId);
  } catch (error) {
    console.log("Error creating book:", error);
    // Handle the error appropriately
  }
};

export default writeBuch;

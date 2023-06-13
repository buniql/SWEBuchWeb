import { Buch, BuchInput, LoginResult } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

//Apollo Client konfiguration - uri des Buch-Backends
const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
});

const writeBuch = async (buch: BuchInput) => {
  //Wenn nach allen Büchern gesucht wird
  let buecherQuery = gql`
    mutation {
      create(
        input: {
          isbn: buch.isbn
          rating: buch.rating
          art: buch.art
          preis: buch.preis
          rabatt: buch.rabatt
          lieferbar: buch.lieferbar
          datum: buch.datum
          homepage: buch.homepage
          schlagwoerter: buch.schlagwoerter
          titel: {
            titel: buch.titel.titel
            untertitel: buch.titel.untertitel
          }
        }
      )
    }
  `;

  try {
    const response = await client.query({
      query: buecherQuery,
    });

    const login: LoginResult = response.data.login;
  } catch (error) {
    console.log("Error logging in:" + error);
    return;
  }
};

export default writeBuch;

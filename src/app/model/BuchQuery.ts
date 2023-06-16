import { Buch } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

// Apollo Client konfiguration
const client = new ApolloClient({
  uri: process.env.API_URI,
});

// GraphQL Query zum Suchen der Bücher
const getBuecher = async (queryString?: string) => {
  // Wenn nach allen Büchern gesucht wird
  let buecherQuery = gql`
    query buecher_query {
      buecher {
        id
        version
        isbn
        rating
        lieferbar
        datum
        homepage
        schlagwoerter
        art
        titel {
          titel
        }
      }
    }
  `;

  if (queryString) {
    if (queryString.match(/^\d+$/)) {
      // Wenn nur nach Zahlen gesucht wird -> Suche nach ID
      buecherQuery = gql`
        query buecher_query {
          buch(id: ${queryString}) {
            id
            version
            isbn
            rating
            lieferbar
            datum
            homepage
            schlagwoerter
            art
            titel {
              titel
            }
          }
        }
      `;
    } else {
      // Wenn nach einem Titel gesucht wird
      buecherQuery = gql`
        query buecher_query {
          buecher(titel: "${queryString}") {
            id
            version
            isbn
            rating
            lieferbar
            datum
            homepage
            schlagwoerter
            art
            titel {
              titel
            }
          }
        }
      `;
    }
  }

  try {
    const response = await client.query({
      query: buecherQuery,
    });

    if (Array.isArray(response.data.buecher)) {
      // Wenn mehrere Bücher abgefragt werden (suche nach allen Büchern oder Titel)
      const buecherList: Buch[] = response.data.buecher;
      return buecherList;
    } else if (response.data.buch) {
      // Wenn ein einzelnes Buch abgefragt wird (suche nach id)
      const buch: Buch = response.data.buch;
      return [buch];
    } else {
      // Wenn nichts gefunden wurde
      return [];
    }
  } catch (error) {
    console.log("Error fetching Data:" + error);
    return [];
  }
};

export default getBuecher;

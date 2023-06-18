import { Buch } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

// Apollo Client konfiguration
const client = new ApolloClient({
  uri: process.env.API_URI,
});

const allProperties: string[] = [
  "id",
  "version",
  "isbn",
  "rating",
  "lieferbar",
  "datum",
  "homepage",
  "schlagwoerter",
  "art",
  "titel { titel }",
];

// GraphQL Query zum Suchen der Bücher
const getBuecher = async (queryString?: string, properties?: string[]) => {
  // Wenn wir Properties mitgeben, dann nehmen wir diese, sonst nehmen wir alle
  const queryProperties =
    properties && properties.length > 0 ? properties : allProperties;

  // Wenn nach allen Büchern gesucht wird
  let buecherQuery = gql`
    query buecher_query {
      buecher {
        ${queryProperties}
      }
    }
  `;

  if (queryString) {
    if (queryString.match(/^\d+$/)) {
      // Wenn nur nach Zahlen gesucht wird -> Suche nach ID
      buecherQuery = gql`
        query buecher_query {
          buch(id: ${queryString}) {
            ${queryProperties}
          }
        }
      `;
    } else {
      // Wenn nach einem Titel gesucht wird
      buecherQuery = gql`
        query buecher_query {
          buecher(titel: "${queryString}") {
            ${queryProperties}
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

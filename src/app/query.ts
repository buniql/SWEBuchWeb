import { Buch } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

const getBuecher = async () => {
  const buecherQuery = gql`
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

  try {
    console.log("Fetching Data");
    const response = await client.query({
      query: buecherQuery,
    });

    const buecherList: Buch[] = response.data.buecher;

    return buecherList;
  } catch (error) {
    console.log("Error fetching Data:" + error);
    throw error;
  }
};

export default getBuecher;

import { LoginResult } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

//Apollo Client konfiguration - uri des Buch-Backends
const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
});

const login = async (username: string, password: string) => {
  //Wenn nach allen Büchern gesucht wird
  let buecherQuery = gql`
    mutation {
      login(username: ${username}, password: ${password}) {
        token
        expiresIn
        roles
      }
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

export default login;

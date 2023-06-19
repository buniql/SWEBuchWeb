import { LoginResult } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { setCookie } from "cookies-next";

// Apollo Client konfiguration
const client = new ApolloClient({
  uri: process.env.API_URI,
});

// GraphQL Mutation zum Einloggen
const login = async (username: string, password: string) => {
  // GraphQL-Mutationsabfrage mit Username & Passwort
  const loginMutation = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        expiresIn
        roles
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: loginMutation,
      variables: { username, password },
    });

    // Erfolgreicher Login
    const loginResult: LoginResult = response.data.login;

    // Token für Anlegen der Bücher setzten
    setCookie("auth", loginResult.token);

    return loginResult;
  } catch (error) {
    // Wenn nicht erfolgreich -> nicht anmelden und fehler ausgeben
    console.log("Error logging in:", error);
    if (error instanceof Error) {
      throw error.message;
    }
  }
};

export default login;

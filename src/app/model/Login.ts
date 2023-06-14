import { LoginResult } from "@/gql/graphql";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { setCookie } from "cookies-next";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
});

const login = async (username: string, password: string) => {
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

    const loginResult: LoginResult = response.data.login;

    setCookie("auth", loginResult.token);

    return loginResult;
  } catch (error) {
    console.log("Error logging in:", error);
    return undefined;
  }
};

export default login;

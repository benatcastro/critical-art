import { API, Auth } from "aws-amplify";
import {
  accountByEmail,
  accountByName,
  listAccounts,
  searchAccounts,
} from "../../graphql/queries";
import { useState, useEffect } from "react";
import { deleteAccount } from "../../graphql/mutations";

export const listUsers = async () => {
  try {
    const userList = API.graphql({ query: listAccounts });
    console.log("userList:", userList);
  } catch (error) {
    console.log("Error listing accounts: ", error);
  }
};

export const GetCurrentUserByEmail = async (__email__) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    const email = user.email;
    console.log("Email:", attributes.email);
    const userByEmail = await API.graphql({
      query: accountByEmail,
      variables: { email: attributes.email },
    });
	return (userByEmail.data.accountByEmail.items)
  } catch (error) {
    console.log("Error getting user by email:", error);
  }
};

export const deleteUser = async () => {
  try {
    API.graphql({
      query: deleteAccount,
      variables: { email: "benatcastro@gmail.com" },
    });
    console.log("User deleted correctly");
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};

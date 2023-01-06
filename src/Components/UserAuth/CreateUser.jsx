import { API } from "aws-amplify";

export const createUser = async (cognitoID, email) => {
  try {
    const data = { id: cognitoID, Email: email, Verified: false };
    const User = await API.graphql({
      query: createAccount,
      variables: { input: data },
      authMode: "AWS_IAM",
    });
    console.log("User correctly created in graphQl: ", User);
  } catch (error) {
    console.log("Error creating user in graphQl: ", error);
  }
};

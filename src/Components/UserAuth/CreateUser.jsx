import { API } from "aws-amplify";
import { createAccount } from "../../graphql/mutations";

export const createUser = async (userData) => {
	let email = userData.email;
	let username = userData.username;
	let firstName = userData.firstname;
	let lastName = userData.lastname;
	try {
    const data = {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      verified: false,
	  artistAcc: false
    };
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

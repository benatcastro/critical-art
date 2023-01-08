import { API, Auth } from "aws-amplify";
import { listAccounts } from "../../graphql/queries";
import { useState, useEffect } from "react";
import { deleteAccount } from "../../graphql/mutations";

export const GetUserByEmail = async (email) => {
  try {
    const apiData = await API.graphql({
      query: listAccounts,
    });
    const listData = apiData.data.listAccounts.items;
    const Filter = listData.filter((user) => user.email === email);
    // console.log("Get User By Email:", Filter);
    return { Filter };
  } catch (error) {
    console.log("Error getting user by email", error);
  }
};

export const GetCurrentUserEmail = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    const CurrentUser = GetUserByEmail(attributes.email);
    // console.log("Current user: ", CurrentUser);
    return attributes.email;
  } catch (error) {
    console.log("Error getting current user:", error);
  }
};

export const GetCurrentUserInfo = () => {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      GetCurrentUserEmail().then((email) => {
        GetUserByEmail(email).then((userObject) => {
          setUserInfo(userObject.Filter);
        });
      });
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };
  return { userInfo };
};

export const listUsers = async (id) => {
  try {
    const userList = API.graphql({ query: listAccounts });
    console.log("userList:", userList);
  } catch (error) {
    console.log("Error listing accounts: ", error);
  }
};

export const deleteUser = async () => {
	try {
		API.graphql({query: deleteAccount, variables: {email: "benatcastro@gmail.com"}})
		console.log("User deleted correctly")
	} catch (error) {
		console.log("Error deleting user:", error)
	}
}

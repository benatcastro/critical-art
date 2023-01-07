import { API, Auth } from "aws-amplify";
import { listAccounts } from "../../graphql/queries";

export const GetUserByEmail = async (email) => {
  try {
    const apiData = await API.graphql({
      query: listAccounts,
    });
    const listData = apiData.data.listAccounts.items;
    const Filter = listData.filter((user) => user.email === email);
    console.log("Get User By Email:", Filter);
    return { Filter };
  } catch (error) {
    console.log("Error getting user by email", error);
  }
};

export const GetCurrentUserEmail = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    GetUserByEmail(attributes.email);
  } catch (error) {
    console.log("Error getting current user:", error);
  }
};

import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listImages } from "../graphql/queries";
import { IsAuth } from "../Components/UserAuth/IsAuth";

const fetchUsers = async () => {
  const apiData = await API.graphql({ query: listImages });
  console.log("apiData", apiData);
};

function App({ signOut }) {
	IsAuth();
	fetchUsers();
  return (
    <div>
      <div className="h-40"></div>

      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(App);

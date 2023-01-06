import { Auth, Hub } from "aws-amplify";
import { useState, useEffect } from "react";

export function AuthenticatedStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function ionViewCanEnter() {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      if (authenticatedUser !== undefined) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    ionViewCanEnter();
  });

  useEffect(() => {
    const listener = (data) => {
      switch (data.payload.event) {
        case "signIn" || "autoSignIn" || "tokenRefresh":
          console.log("is authenticated");
          setIsAuthenticated(true);
          break;
        case "signOut" ||
          "signIn_failure" ||
          "tokenRefresh_failure" ||
          "autoSignIn_failure":
          console.log("is not authenticated");
          setIsAuthenticated(false);
          break;
        default:
          setIsAuthenticated(false);
      }
    };

    Hub.listen("auth", listener);
  });
  console.log("User is logged", isAuthenticated);
  return isAuthenticated;
}

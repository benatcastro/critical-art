import "@aws-amplify/ui-react/styles.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProfileSidebar } from "../Components/ProfileMenu/ProfileSidebar";
import { IsAuth } from "../Components/UserAuth/IsAuth";

export const Profile = () => {;
  return (
    <>
      {IsAuth() ? null : <p>You need to be logged</p>}
      <ProfileSidebar />
    </>
  );
};

import "@aws-amplify/ui-react/styles.css";
import { Typography } from "@mui/material";
import {
  GetCurrentUserEmail,
  GetUserByEmail,
} from "../Components/UserAuth/FetchUserInfo";
import {IsAuth } from "../Components/UserAuth/IsAuth"

export const Profile = () => {
  IsAuth();
  GetCurrentUserEmail();
  return (
    <div>
      <Typography variant="h6">Profile</Typography>
      <Typography variant="h6">Profile</Typography>
      <Typography variant="h6">Profile</Typography>
      <Typography variant="h6">Profile</Typography>
      <Typography variant="h6">Profile</Typography>
    </div>
  );
};

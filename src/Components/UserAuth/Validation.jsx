import { Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";

const ConfirmSignUp = () => {
  const [errors, setErrors] = useState();
  async function confirmSignUp(code, username) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      setErrors(error.toString());
      console.log("error confirming sign up", error);
    }
  }
  return { errors };
};

export const ValidationForm = (setMenu) => {
  return (
    <div className="confirmation-form-container">
      <div className="confirmation-text">
        <Typography variant="h6">Confirm your account using the code sent to "EMAIL"</Typography>
      </div>
    </div>
  );
};

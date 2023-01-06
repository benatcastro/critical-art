import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";

export const SignInForm = (props) => {
  return (
    <div className="signin-form-container">
      <div className="signin-textfields">
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          margin="normal"
        />
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
        />
        <div className="signup-btn">
          <Button onClick={() => props.setMenu("signup-menu")}>
            <b>Create Account</b>
          </Button>
          <Button variant="contained" color="secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

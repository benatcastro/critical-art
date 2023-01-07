import React, { useState, useEffect } from "react";
import "./Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { SignUpForm } from "../UserAuth/SignUp";
import { SignInForm } from "../UserAuth/SignIn";
import { ValidationForm } from "../UserAuth/Validation";

export const LoginPopup = (props) => {
  const [menu, setMenu] = useState("login-menu");
  const [email, setEmail] = useState(null)
  return (
    <div className="main-container">
      <div className="form-container">
        <IconButton className="close-btn" onClick={props.toggleDisplay}>
          <CloseIcon sx={{ fontSize: "2rem", color: "black" }} />
        </IconButton>
        {menu === "signup-menu" ? (
          <SignUpForm setMenu={setMenu} setEmail={setEmail}/>
        ) : menu === "login-menu" ? (
          <SignInForm setMenu={setMenu} />
        ) : menu === "validation-menu" ? (
          <ValidationForm setMenu={setMenu} email={email} />
        ) : null}
      </div>
    </div>
  );
};
/*type Account
  @model
  @searchable
  @auth(
    rules: [{ allow: private, provider: iam }, { allow: public, provider: iam }]
  ) {
  id: ID! @primaryKey
  email: String @index(name: "byEmail", queryField: "accountByEmail")
  username: String
  firstName: String
  lastName: String
  verified: Boolean
}

type image
  @model
  @searchable
  @auth(
    rules: [{ allow: private, provider: iam }, { allow: public, provider: iam }]
  ) {
  id: ID!
  src: String
  author: Account
  shortDesc: String
  description: String
} */

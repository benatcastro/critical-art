import {
  Avatar,
  CircularProgress,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  IconButton,
  Popper,
  Fade,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { GetCurrentUserEmail, GetUserByEmail } from "../UserAuth/FetchUserInfo";
import "./AccountSettings.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { createBrowserHistory } from "@remix-run/router";

export const AccountSettings = () => {
  const [userData, setUserData] = useState();
  const [readOnly, setWrite] = useState(true);
  const [openPopper, setPopper] = useState(false);
  useEffect(() => {
    fetchUserInfo();
    clearTimeout(waitForData);
  }, []);
  const fetchUserInfo = async () => {
    try {
      GetCurrentUserEmail().then((email) => {
        GetUserByEmail(email).then((userObject) => {
          setUserData(userObject.Filter);
        });
      });
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };
  const waitForData = setTimeout(() => 250);
  const history = createBrowserHistory();
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    bio: Yup.string()
      .min(10, "Bio must be at least 10 characters long")
      .max(100, "Bio must not exceed 20 characters"),
  });
  const onSubmit = (data) => {
    console.log("Form data:", data);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Paper className="account-settings-container">
      <div className="user-info-container">
        <div className="user-data">
          {typeof userData === "undefined"
            ? waitForData && <CircularProgress className="loading-data" />
            : userData.map((items, idx) => {
                return (
                  <div className="update-data" key={0}>
                    <div className="fullname" key={1}>
                      <TextField
                        label="First Name"
                        key={idx}
                        id="firstname"
                        name="firstname"
                        margin="normal"
                        defaultValue={items.firstName}
                        {...register("firstname")}
                        error={errors.firstname ? true : false}
                        helperText={
                          errors.firstname ? errors.firstname.message : null
                        }
                        inputProps={{
                          readOnly: readOnly ? true : false,
                        }}
                      />
                      <TextField
                        key={2}
                        label="Last Name"
                        id="lastname"
                        name="lastname"
                        margin="normal"
                        defaultValue={items.lastName}
                        {...register("lastname")}
                        error={errors.lastname ? true : false}
                        helperText={
                          errors.lastname ? errors.lastname.message : null
                        }
                        inputProps={{
                          readOnly: readOnly ? true : false,
                        }}
                      />
                    </div>
                    <div className="user-email">
                      <TextField
                        key={3}
                        label="Username"
                        variant="outlined"
                        id="username"
                        name="username"
                        margin="normal"
                        defaultValue={items.username}
                        {...register("username")}
                        error={errors.username ? true : false}
                        helperText={
                          errors.username ? errors.username.message : null
                        }
                        inputProps={{
                          readOnly: readOnly ? true : false,
                        }}
                      />
                      <TextField
                        key={4}
                        label="Email"
                        id="email"
                        name="email"
                        defaultValue={items.email}
                        margin="normal"
                        {...register("email")}
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : null}
                        inputProps={{
                          readOnly: readOnly ? true : false,
                        }}
                      />
                    </div>
                    <TextField
                      key={5}
                      label="Biography"
                      multiline
                      rows={4}
                      id="bio"
                      name="bio"
                      fullWidth
                      defaultValue={items.biography}
                      margin="normal"
                      {...register("bio")}
                      error={errors.bio ? true : false}
                      helperText={errors.bio ? errors.bio.message : null}
                      inputProps={{
                        readOnly: readOnly ? true : false,
                      }}
                    />
                  </div>
                );
              })}
          <div className="update-btn">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setWrite(!readOnly)}
            >
              <Typography color="basics.white">
                {readOnly ? "Edit" : "Save"}
              </Typography>
            </Button>
            {!readOnly ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.go(0)}
              >
                <Typography color="basics.white">Cancel</Typography>
              </Button>
            ) : null}
          </div>
        </div>
        <div className="avatar-container">
          <IconButton onClick={() => setPopper(!openPopper)}>
            <Avatar
              sx={{ bgColor: "secondary.dark", width: 128, height: 128 }}
              className="avatar"
              id="avatar"
            ></Avatar>
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

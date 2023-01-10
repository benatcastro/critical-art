import {
  Avatar,
  CircularProgress,
  Typography,
  Box,
  TextField,
  Paper,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { GetCurrentUserByEmail, listUsers } from "../UserAuth/FetchUserInfo";
import "./AccountSettings.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { type } from "@testing-library/user-event/dist/type";
import { padding } from "@mui/system";

export const AccountSettings = () => {
  const [userData, setUserData] = useState();
  const [readOnly, setWrite] = useState(true);
  const [loadingUserData, setLoadingData] = useState(true);
  useEffect(() => {
    const resolveUserdata = async () => {
      try {
        setLoadingData(true);
        await GetCurrentUserByEmail().then((user) => {
          setUserData(user);
        });
      } catch (error) {
        console.log("Error resolving userData:", error);
        setUserData(null);
      } finally {
        setLoadingData(false);
      }
    };
    resolveUserdata();
  }, []);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    bio: Yup.string()
      .max(100, "Biography must not exceed 100 characters"),
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
	resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data) => console.log(data);
  if (!loadingUserData) {
    return userData.map((items) => {
      return (
        <Paper
		key={0}
          className="account-settings-contair"
          style={{
            position: "absolute",
            left: "50%",
            top: "60%",
            transform: "translate(-50%, -50%)",
            paddingBottom: "2%",
          }}
        >
          <Box
		  key={1}
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton key={2}>
              <Avatar
			  key={3}
                style={{ justifyContent: "center", display: "flex" }}
                sx={{ height: 128, width: 128 }}
                src={userData.avatar}
                alt={userData.username}
              />
            </IconButton>
          </Box>
          <Box ml="5%" mr="5%" key={4}>
            <Grid
			key={5}
              container
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              rowSpacing={2}
            >
              <Grid item xs={6} key={6}>
                <Typography color="basics.black">First Name</Typography>
                <TextField
                  id="firstname"
                  name="firstname"
                  fullWidth
                  defaultValue={items.firstName}
                  {...register("firstname")}
                  error={errors.lastname ? true : false}
                  helperText={
                    errors.firstname ? errors.firstname.message : null
                  }
                  inputProps={{
                    readOnly: readOnly ? true : false,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} key={7}>
                <Typography color="basics.black">Last Name</Typography>
                <TextField
                  id="lastname"
                  name="lastname"
                  fullWidth
                  defaultValue={items.lastName}
                  {...register("lastname")}
                  error={errors.lastname ? true : false}
                  helperText={errors.lastName ? errors.lastName.message : null}
                  inputProps={{
                    readOnly: readOnly ? true : false,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} key={8}>
                <Typography color="basics.black">Username</Typography>
                <TextField
                  id="username"
                  name="username"
                  fullWidth
                  defaultValue={items.firstName}
                  {...register("username")}
                  error={errors.username ? true : false}
                  helperText={errors.username ? errors.username.message : null}
                  inputProps={{
                    readOnly: readOnly ? true : false,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} key={9}>
                <Typography color="basics.black">Email</Typography>
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  defaultValue={items.email}
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email.message : null}
                  inputProps={{
                    readOnly: readOnly ? true : false,
                  }}
                ></TextField>
              </Grid>
              <Grid container ml={3} key={10}>
                <Typography color="basics.black">Biography</Typography>
                <TextField
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
              </Grid>
            </Grid>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Box>
        </Paper>
      );
    });
  }
};
/* */
/*{typeof userData === "undefined"
          ? waitForData && (
              <Box
                display="flex"
                mt="25%"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress color="secondary" />
              </Box>
            )
          : userData.map((items, idx) => {
              const onSubmit = (data) => {
                console.log("Form data:", data);
              };
              return (
              );
            })}*/

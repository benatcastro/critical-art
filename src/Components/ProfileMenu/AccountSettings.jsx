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

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  if (!loadingUserData) {
    return userData.map((items, index) => {
      return (
        <Paper
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
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton>
              <Avatar
                style={{ justifyContent: "center", display: "flex" }}
                sx={{ height: 128, width: 128 }}
                src={userData.avatar}
                alt={userData.username}
              />
            </IconButton>
          </Box>
          <Box ml="5%" mr="5%">
            <Grid
              container
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              rowSpacing={2}
            >
              <Grid item xs={6}>
                <Typography color="basics.black">First Name</Typography>
                <TextField
                  key={5}
                  id="bio"
                  name="bio"
                  fullWidth
                  defaultValue={items.firstName}
                  {...register("firstname")}
                  error={errors.bio ? true : false}
                  helperText={errors.bio ? errors.bio.message : null}
                  inputProps={{
                    readOnly: readOnly ? true : false,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <Typography color="basics.black">Last Name</Typography>
                <TextField fullWidth></TextField>
              </Grid>
              <Grid item xs={6}>
                <Typography color="basics.black">Username</Typography>
                <TextField fullWidth></TextField>
              </Grid>
              <Grid item xs={6}>
                <Typography color="basics.black">Email</Typography>
                <TextField fullWidth></TextField>
              </Grid>
              <Grid item xs={6}>
                <Typography color="basics.black">Biography</Typography>
                <TextField
                  key={5}
                  label="Biography"
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
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

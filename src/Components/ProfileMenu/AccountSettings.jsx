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
  Popover,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { GetCurrentUserByEmail, listUsers } from "../UserAuth/FetchUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Storage, API } from "aws-amplify";
import { updateAccount } from "../../graphql/mutations";
import PublishIcon from "@mui/icons-material/Publish";

const ChangeAvatar = () => {
  const [file, setFile] = useState([]);
  var id;
  async function updateAvatar() {
    try {
      await GetCurrentUserByEmail().then((userId) => {
        userId.map((items) => {
          id = items.id;
          console.log("id", id);
        });
      });
      await Storage.put(file.name, file, {});
      const data = {
        id: id,
        avatar: file.name,
      };
      await API.graphql({
        query: updateAccount,
        variables: { input: data },
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <Box sx={{ p: 1, bgcolor: "basics.white" }} boxShadow={1}>
      <IconButton>
        <label htmlFor={"upload-button"}>
          <div className="chooseFile">
            <PublishIcon style={{ mr: 10, width: 20 }} />
          </div>
        </label>
      </IconButton>
      <input
        type="file"
        accept="image/**"
        id="upload-button"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button onClick={updateAvatar}>Upload</Button>
    </Box>
  );
};

const saveDataChanges = async (data) => {
  var userID;
  await GetCurrentUserByEmail().then((user) => {
    user.map((items) => {
      userID = items.id;
    });
  });
  const updateData = {
    id: userID,
    email: data.email,
    username: data.username,
    firstName: data.firstname,
    lastName: data.lastname,
    biography: data.bio,
    verified: true,
  };
  console.log(updateData);
  await API.graphql({
    query: updateAccount,
    variables: { input: updateData },
  });
};

export const AccountSettings = () => {
  const [userData, setUserData] = useState();
  const [readOnly, setWrite] = useState(true);
  const [loadingUserData, setLoadingData] = useState(true);
  const [confirmChanges, setConfirmChanges] = useState(false);
  const [anchorElCancel, setAnchorElCancel] = React.useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState("upload-avatar");
  const [avatar, setAvatar] = useState();
  const [mappedData, setMappedData] = useState();
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const anchorRef = React.useRef();
  React.useEffect(() => {
    setTimeout(() => setAnchorElCancel(anchorRef?.current), 1);
    setTimeout(() => setAnchorElAvatar(anchorRef?.current), 1);
  }, [anchorRef]);
  const handleAvatar = (event) => {
    setAnchorElAvatar(event.currentTarget);
    setOpenAvatar(!openAvatar);
  };
  const handleCloseAvatar = () => {
    setAnchorElAvatar(null);
    setOpenAvatar(!openAvatar);
    setAvatarMenu("upload-avatar");
  };
  const handleCancel = (event) => {
    setAnchorElCancel(event.currentTarget);
    setConfirmChanges(!confirmChanges);
  };

  const handleCancelClose = () => {
    setAnchorElCancel(null);
    setConfirmChanges(!confirmChanges);
  };

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

  useEffect(() => {
    const fetchAvatar = async () => {
      var userAvatar;
      await GetCurrentUserByEmail().then((user) => {
        userAvatar = user;
      });
      userAvatar.map(async (items) => {
        if (items.avatar) {
          await Storage.get(items.avatar).then((avatarValue) => {
            setAvatar(avatarValue);
          });
        }
        return items;
      });
    };
    fetchAvatar();
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
      .max(100, "Biography must not exceed 100 characters")
      .nullable(),
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    saveDataChanges(data);
  };
  useEffect(() => {
    if (!loadingUserData) {
      userData.map((items) => {
        setMappedData(items);
      });
      setUserDataLoaded(true);
    }
  });

  if (userDataLoaded) {
    const resetFields = () => {
      setWrite(!readOnly);
      setConfirmChanges(!confirmChanges);
      setValue("firstname", mappedData.firstName);
      setValue("lastname", mappedData.lastName);
      setValue("email", mappedData.email);
      setValue("username", mappedData.username);
      setValue("bio", mappedData.biography);
    };
    return (
      <Paper style={{ paddingBottom: "2%" }} elevation={3}>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Popover
            id="aria-describedby"
            open={openAvatar}
            anchorEl={anchorElAvatar}
            onClose={handleCloseAvatar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ p: 1, bgcolor: "basics.white" }} boxShadow={1}>
              {avatarMenu === "upload-avatar" ? (
                <Button
                  size="small"
                  onClick={() => setAvatarMenu("change-avatar")}
                >
                  <Typography>Change avatar</Typography>
                </Button>
              ) : (
                <ChangeAvatar />
              )}
            </Box>
          </Popover>
          <IconButton id="aria-describedby" onClick={handleAvatar}>
            <Avatar
              style={{ justifyContent: "center", display: "flex" }}
              sx={{ height: 128, width: 128 }}
              src={avatar}
              alt={mappedData.username}
            />
          </IconButton>
        </Box>
        <Box textAlign="center" mt={2} mb={2}>
          <Typography fontSize={20} fontWeight="500" color="basics.black">
            Update your account settings
          </Typography>
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
                id="firstname"
                name="firstname"
                fullWidth
                defaultValue={mappedData.firstName}
                {...register("firstname")}
                error={errors.lastname ? true : false}
                helperText={errors.firstname ? errors.firstname.message : null}
                inputProps={{
                  readOnly: readOnly ? true : false,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography color="basics.black">Last Name</Typography>
              <TextField
                id="lastname"
                name="lastname"
                fullWidth
                defaultValue={mappedData.lastName}
                {...register("lastname")}
                error={errors.lastname ? true : false}
                helperText={errors.lastName ? errors.lastName.message : null}
                inputProps={{
                  readOnly: readOnly ? true : false,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography color="basics.black">Username</Typography>
              <TextField
                id="username"
                name="username"
                fullWidth
                defaultValue={mappedData.username}
                {...register("username")}
                error={errors.username ? true : false}
                helperText={errors.username ? errors.username.message : null}
                inputProps={{
                  readOnly: readOnly ? true : false,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography color="basics.black">Email</Typography>
              <TextField
                id="email"
                name="email"
                fullWidth
                defaultValue={mappedData.email}
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
                inputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid container ml={3} >
              <Typography  mt={1} color="basics.black">
                Biography
              </Typography>
              <TextField
                multiline
                rows={4}
                id="bio"
                name="bio"
                fullWidth
                defaultValue={mappedData.biography}
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
          <Button
            color="secondary"
            variant="contained"
            onClick={
              readOnly ? () => setWrite(!readOnly) : handleSubmit(onSubmit)
            }
          >
            <Typography color="basics.whte">
              {readOnly ? "Edit" : "Save"}
            </Typography>
          </Button>
          <Popover
            id="aria-describedby"
            open={confirmChanges}
            anchorEl={anchorElCancel}
            onClose={handleCancelClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ p: 1, bgcolor: "basics.white" }} boxShadow={1}>
              <Box >
                <Typography  color="">
                  Cancel changes?
                </Typography>
              </Box>
              <Grid >
                <Button  onClick={resetFields}>
                  <Typography >
                    Yes
                  </Typography>
                </Button>
                <Button
                  onClick={() => setConfirmChanges(!confirmChanges)}
                >
                  <Typography>
                    No
                  </Typography>
                </Button>
              </Grid>
            </Box>
          </Popover>
          {!readOnly ? (
            <Button
              id="aria-describedby"
              type="button"
              onClick={handleCancel}
              variant="contained"
            >
              Cancel
            </Button>
          ) : null}
        </Box>
      </Paper>
    );
  } else {
    return (
      <Box
        display="flex"
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Box>
    );
  }
};

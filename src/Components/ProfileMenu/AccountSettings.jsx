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

const ChangeAvatar = () => {
  const [file, setFile] = useState([]);
  var id;
  async function updateAvatar() {
    try {
	await GetCurrentUserByEmail().then((userId) => {
		userId.map((items) => {
			id = items.id
			console.log("id", id);
		})
	})
      const src = await Storage.put(file.name, file, {
        contentType: "image/png",
	});
	const data = {
		id: id,
		avatar: file.name,
	}
	const updatedUser = await API.graphql({query: updateAccount, variables: {input: data }})
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <Box sx={{ p: 1, bgcolor: "basics.white" }} boxShadow={1}>
      <input type="file" accept="image/**" onChange={e => setFile(e.target.files[0])} />
      ;<Button onClick={updateAvatar}>Test</Button>
    </Box>
  );
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
  const onSubmit = (data) => console.log(data);
  if (!loadingUserData) {
    return userData.map((items) => {
      const resetFields = () => {
        setWrite(!readOnly);
        setConfirmChanges(!confirmChanges);
        setValue("firstname", items.firstName);
        setValue("lastname", items.lastName);
        setValue("email", items.email);
        setValue("username", items.username);
        setValue("bio", items.biography);
      };
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
            <IconButton key={2} id="aria-describedby" onClick={handleAvatar}>
              <Avatar
                key={3}
                style={{ justifyContent: "center", display: "flex" }}
                sx={{ height: 128, width: 128 }}
                src={userData.avatar}
                alt={userData.username}
              />
            </IconButton>
          </Box>
          <Box textAlign="center" mt={2} mb={2}>
            <Typography fontWeight="500">
              Update your account settings
            </Typography>
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
                <Box>
                  <Typography color="">Cancel changes?</Typography>
                </Box>
                <Grid>
                  <Button onClick={resetFields}>
                    <Typography color="">Yes</Typography>
                  </Button>
                  <Button onClick={() => setConfirmChanges(!confirmChanges)}>
                    <Typography color="">No</Typography>
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
    });
  } else {
    return (
      <Paper>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress sx={{ color: "secondary" }} />
        </Box>
      </Paper>
    );
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

import { Typography, Box, TextField, Paper, Grid, Divider, Button } from "@mui/material";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const updatePassword = (data) => {};

export const PasswordSettings = () => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Updating", data);
    updatePassword(data);
  };
  return (
    <Paper style={{ paddingBottom: "2%" }} elevation={3}>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Typography fontSize={20} fontWeight="500" color="basics.black" mb={1} mt={4}>
            Update your password
          </Typography>
		  <Divider color="basics.black" sx={{mb: 3,}} style={{height: 2}}/>
          <Typography color="basics.black">Current password</Typography>
          <TextField
            id="currentpass"
            name="currentpass"
			type="password"
            fullWidth
            {...register("currentpass")}
          ></TextField>
          <Typography color="basics.black">New password</Typography>
          <TextField
            id="newpass"
            name="newpass"
			type="password"
            fullWidth
            {...register("newpass")}
          ></TextField>
          <Typography color="basics.black">Confirm password</Typography>
          <TextField
            id="confirmpass"
            name="confirmpass"
			type="password"
            fullWidth
            {...register("confirmpass")}
          ></TextField>
		  <Button variant="contained" color="secondary" onClick={() => handleSubmit(onSubmit)} style={{marginTop: 10}}>Save changes</Button>
        </Box>
      </Box>
    </Paper>
  );
};

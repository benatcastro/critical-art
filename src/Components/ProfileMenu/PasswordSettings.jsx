import { Typography, Box, TextField, Paper, Grid } from "@mui/material";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const updatePassword = (data) => {};

export const PasswordSettings = () => {
  const [readOnly, setWrite] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    console.log("Updating", data);
    updatePassword(data);
  };
  return (
    <Paper
      key={0}
      className="account-settings-contair"
      style={{
        position: "absolute",
        left: "50%",
        top: "120%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
        paddingBottom: "2%",
      }}
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        boxShadow={1}
      >
        <Box>
          <Typography>Edit your password</Typography>
        </Box>
        <Box>
          <Grid
            container
            justifyContent="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowSpacing={2}
          >
            <Grid item xs={6}>
              <Typography color="basics.black">New password</Typography>
              <TextField
                id="firstname"
                name="firstname"
                fullWidth
                // defaultValue={}
                {...register("firstname")}
                error={errors.lastname ? true : false}
                helperText={errors.firstname ? errors.firstname.message : null}
                inputProps={{
                  readOnly: readOnly ? true : false,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography color="basics.black">Confirm password</Typography>
              <TextField
                id="lastname"
                name="lastname"
                fullWidth
                // defaultValue={items.lastName}
                {...register("lastname")}
                error={errors.lastname ? true : false}
                helperText={errors.lastName ? errors.lastName.message : null}
                inputProps={{
                  readOnly: readOnly ? true : false,
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

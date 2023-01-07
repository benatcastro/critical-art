import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import "./ValidationForm.scss";
import { useState, useEffect } from "react";

async function confirmSignUp(data, setConfirmErrors) {
  let username = data.email;
  let code = data.code;
  try {
    await Auth.confirmSignUp(username, code);
    console.log("Validation succesfull");
  } catch (error) {
    setConfirmErrors(error.toString());
    console.log("error confirming sign up", error);
  }
}

export const ValidationForm = (props) => {
  const [confirmErrors, setConfirmErrors] = useState();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    code: Yup.string().required("Code is required"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    confirmSignUp(data, setConfirmErrors);
  };
  console.log(confirmErrors);
  return (
    <div className="validation-form-container">
      <div className="validation-text">
        <Typography variant="inherit">
          Validate your account with the code sent to{" "}
          {props.email ? (
            <b>{props.email}</b>
          ) : (
            <>
              <Typography>
                your <b>email</b>
              </Typography>
            </>
          )}
        </Typography>
      </div>
      <div className="validation-textfields">
        <TextField
          required
          defaultValue={props.email}
          id="email"
          name="email"
          label="Email"
          margin="normal"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email.message : null}
        />
        <TextField
          required
          id="code"
          name="code"
          label="Confirmation code"
          margin="normal"
          {...register("code")}
          error={errors.code ? true : false}
          helperText={errors.code ? errors.code.message : null}
        />
      </div>
      <div className="validate-btn">
        <Button onClick={() => props.setMenu("login-menu")}>
          <b>Back to login</b>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Validate
        </Button>
      </div>
    </div>
  );
};

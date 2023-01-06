import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import "./SignUpForm.scss";
import { createUser } from "./CreateUser";

const signUp = async (data) => {
  let username = data.email;
  let password = data.password;
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {},
      autoSignIn: {
        enabled: true,
      },
    });
    console.log("User signed up correctly:", user);
    createUser(data);
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export const SignUpForm = (props) => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords doesn't match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
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
    signUp(data);
  };
  return (
    <div className="signup-form-container">
      <div className="signup-textfields">
        <TextField
          required
          variant="outlined"
          id="username"
          name="username"
          label="Username"
          margin="normal"
          {...register("username")}
          error={errors.username ? true : false}
          helperText={errors.username ? errors.username.message : null}
        />
        <div className="name-textfields">
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First Name"
            margin="normal"
            {...register("firstname")}
            error={errors.firstname ? true : false}
            helperText={errors.firstname ? errors.firstname.message : null}
          />
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last Name"
            margin="normal"
            {...register("lastname")}
            error={errors.lastname ? true : false}
            helperText={errors.lastname ? errors.lastname.message : null}
          />
        </div>
        <TextField
          required
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
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : null}
        />
        <TextField
          required
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          margin="normal"
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : null
          }
        />
      </div>
      <Button className="validate-btn">Validate</Button>
      <div className="signup-btn">
        <Button onClick={() => props.setMenu("login-menu")}>
          <b>Back to login</b>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

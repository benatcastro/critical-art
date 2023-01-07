import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import "./SignInForm.scss";

async function signIn(data) {
  let username = data.email;
  let password = data.password;
  try {
    const user = await Auth.signIn(username, password);
    console.log("User signed up correctly:", user);
  } catch (error) {
    console.log("error signing in", error);
  }
}

export const SignInForm = (props) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
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
    signIn(data, props.setMenu);
  };
  return (
    <div className="signin-form-container">
      <div className="signin-textfields">
        <div className="text-center">
          <Typography>Login with your Email and Password</Typography>
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
      </div>
      <div className="signin-btn">
        <Button onClick={() => props.setMenu("signup-menu")}>
          <b>Create Account</b>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

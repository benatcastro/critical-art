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
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
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
	signIn(data)
};
  return (
    <div className="signup-form-container">
      <div className="signup-textfields">
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
          <b>Create account</b>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          login
        </Button>
      </div>
    </div>
  );
};

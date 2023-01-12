import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


//MUI
import { createTheme, ThemeProvider } from "@mui/material";

//ROUTER
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";

//AWS
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
const mainTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#424242",
      light: "#6d6d6d",
	  dark: "#1b1b1b",
      contrastText: "#c9d8c7",
    },
    secondary: {
      main: "#2196f3",
	  light: "#6ec6ff",
	  dark: "#0069c0",
      contrastText: "#4e4546",
    },
	basics: {
		white: "#ffffff",
		black: "#000000"
	},
  },
    typography: {
    "fontFamily": `"Montserrat", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

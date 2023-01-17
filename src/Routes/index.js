import { createBrowserRouter } from "react-router-dom";
import { AboutUs } from "../Pages/AboutUs";
import { Home } from "../Pages/Home";
import { Donate } from "../Pages/Donate";
import { Layout } from "./Layout";
import { NotFound } from "../Pages/NotFound";
import { Artists } from "../Pages/Artists";
import { Contact } from "../Pages/Contact";
import { Profile } from "../Pages/Profile";
import { ImageSlider } from "../Components/HomePage/ImageSlider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <ImageSlider />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/artists",
        element: <Artists />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

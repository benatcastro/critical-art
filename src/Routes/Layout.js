import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Components/Footer/Footer";
import { Navbar } from "../Components/Navbar/Navbar";
import { IsAuth } from "../Components/UserAuth/IsAuth";

export const Layout = () => {
  const UserAuth = IsAuth();
  return (
    <>
      <Navbar auth={UserAuth} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

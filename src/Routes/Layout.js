import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { IsAuth } from "../Components/UserAuth/IsAuth";

export const Layout = () => {
	const UserAuth = IsAuth();
  return (
    <>
	<Navbar auth={UserAuth}/>
        <main>
          <Outlet />
        </main>
    </>
  );
};

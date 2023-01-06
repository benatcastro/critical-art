import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
	<>
    <h1>
      NotFound 404
      <Link to="/">Home</Link>
    </h1>
	</>
  );
};

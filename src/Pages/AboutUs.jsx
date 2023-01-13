import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import { Button } from "@mui/material";
import { listImages } from "../graphql/queries";
import { GetCurrentId } from "../Components/UserAuth/FetchUserInfo";

export const AboutUs = () => {
  useEffect(() => {
    const fetchImages = async () => {
      const images = await API.graphql({ query: listImages });
      console.log("Images:", images.data.listImages);
    };
    fetchImages();
  }, []);
};

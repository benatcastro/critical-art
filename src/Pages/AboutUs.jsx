import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import { Button } from "@mui/material";

export const AboutUs = () => {
  const [Image, setImage] = useState();
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const image = await Storage.put(file.name, file, {
        contentType: "image/**",
      });
      setImage(image);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  useEffect(() => {
    const fetchImage = async () => {

      const imageData = Storage.get("logo2.jpg").then((value) => {
		  setImage(value);
	  });
    };
    fetchImage();
  }, []);
  const listData = () => {
    Storage.list("") // for listing ALL files without prefix, pass '' instead
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    console.log("Image Data:", Image);
  };
  return (
    <div>
      <div style={{ margin: 500 }}>
        <input type="file" onChange={onChange} />
        <Button onClick={listData}>Test</Button>
		<img src={Image}></img>
      </div>
    </div>
  );
};

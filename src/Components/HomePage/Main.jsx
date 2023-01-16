import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { listImages } from "../../graphql/queries";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./HomePageStyles.scss";
import logo_glitch from "../../Logos/logo_glitch.svg";

const getFavImg = async (setLoaded, setImgList) => {
  const imageData = await API.graphql({ query: listImages });
  const imageList = imageData.data.listImages.items;
  const favImgs = imageList.filter((image) => image.isFav === true);
  setImgList(favImgs);
  setLoaded(true);
};

export const HomePageMain = () => {
  const [imgList, setImgList] = useState();
  const [img, setImg] = useState();
  const [Loaded, setLoaded] = useState(false);
  const [ImageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    getFavImg(setLoaded, setImgList);
  }, []);
  useEffect(() => {
    try {
      const fetchImg = async () => {
        const randomImg = imgList[Math.floor(Math.random() * imgList.length)];
        randomImg.src = randomImg.src.substring(randomImg.src.indexOf("=") + 1);
        randomImg.src = randomImg.src.substring(0, randomImg.src.length - 1);
        const url = await Storage.get(randomImg.src, {});
        setImg(url);
      };
      if (typeof imgList !== "undefined") {
        fetchImg();
      }
    } catch (error) {}
  }, [Loaded]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (ImageLoaded) {
    return (
      <Box>
        <img src={img} alt="" className="main-img" />;
        <div className="home-container">
          <div className="home-logo">
            <img src={logo_glitch} className="home-logo"></img>
          </div>
        </div>
      </Box>
    );
  } else {
    return (
      <Box
        display="flex"
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Box>
    );
  }
};

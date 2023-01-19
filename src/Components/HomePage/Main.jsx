import { useState, useEffect, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { listImages } from "../../graphql/queries";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./HomePageStyles.scss";
import "./arrow.scss";
import logo_glitch from "../../Logos/logo_glitch.svg";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  MoveIn,
} from "react-scroll-motion";
import { useNavigate } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";

const getFavImg = async (setLoaded, setImgList) => {
  const imageData = await API.graphql({ query: listImages });
  const imageList = imageData.data.listImages.items;
  const favImgs = imageList.filter((image) => image.isFav === true);
  setImgList(favImgs);
  setLoaded(true);
};

export const HomePageMain = (sliderRef) => {
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
    }, 250);
    return () => clearTimeout(timer);
  }, []);

const [scrollY, setScrollY] = useState(0);

  function logit() {
    setScrollY(window.pageYOffset);
	if (scrollY > 1300)
		navigate('/home')
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });
  const navigate = useNavigate();
  const isPresent = useIsPresent();
  if (ImageLoaded) {
    return (
      <div style={{ height: "100%" }}>
        <img src={img} className="main-img" style={{}} />
        <ScrollContainer>
          <ScrollPage page={0}>
            <Animator animation={batch(Fade())}>
              <div className="home-container">
                <img src={logo_glitch} className="home-logo"></img>
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage page={1}>
            <div className="home-text">
              <Typography
                mt={5}
                fontSize={100}
                fontWeight={600}
                color="basics.white"
                variant="h6"
              >
                <Animator animation={batch(FadeIn())}>WE ARE</Animator>
                <Animator animation={batch(FadeIn(), MoveIn(-1000, 0))}>
                  ARTISTS
                </Animator>
                <Animator animation={batch(FadeIn(), MoveIn(1000, 0))}>
                  PAINTERS
                </Animator>
                <Animator animation={batch(FadeIn(), MoveIn(-1000, 0))}>
                  CREATORS
                </Animator>
              </Typography>
            </div>
          </ScrollPage>
          <div style={{ height: 200 }}>
            <ScrollPage>
              <div>
                <div className="content">
                  <svg id="more-arrows" onClick={() => navigate("/home")}>
                    <polygon
                      className="arrow-top"
                      points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "
                    />
                    <polygon
                      className="arrow-middle"
                      points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "
                    />
                    <polygon
                      className="arrow-bottom"
                      points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "
                    />
                  </svg>
                </div>
              </div>
            </ScrollPage>
          </div>
        </ScrollContainer>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: 0,
            transition: { duration: 0.5, ease: "circOut" },
          }}
          exit={{ scaleY: 1, transition: { duration: 0.5, ease: "circIn" } }}
          style={{ originY: isPresent ? 0 : 1 }}
          className="privacy-screen"
        />
      </div>
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

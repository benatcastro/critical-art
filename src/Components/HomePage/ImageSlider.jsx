import { Typography, Box, Icon } from "@mui/material";
import React, { useState } from "react";
import img1 from "../../Images/landscape2.jpg";
import img2 from "../../Images/landscape3.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "./ImageSlider.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const ImageSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const images = [img1, img2];
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="slider-container">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
		  className="slider-image"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <ArrowForwardIosIcon />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <ArrowForwardIosIcon />
      </div>
	  <div className="image-info">

	  </div>
    </div>
  );
};

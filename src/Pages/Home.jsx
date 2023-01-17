import { useRef } from "react";
import { ImageSlider } from "../Components/HomePage/ImageSlider";
import { HomePageMain } from "../Components/HomePage/Main";

export const Home = () => {
  const slider = useRef(null);
  return (
	  <>
        <HomePageMain />
    </>
  );
};

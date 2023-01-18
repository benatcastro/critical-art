import { AboutUs } from "./Pages/AboutUs";
import { Home } from "./Pages/Home";
import { Donate } from "./Pages/Donate";
import { NotFound } from "./Pages/NotFound";
import { Artists } from "./Pages/Artists";
import { Contact } from "./Pages/Contact";
import { Profile } from "./Pages/Profile";
import { ImageSlider } from "./Components/HomePage/ImageSlider";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const Paths = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<ImageSlider />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

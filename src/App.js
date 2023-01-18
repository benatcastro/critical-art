//ROUTER
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { AboutUs } from "./Pages/AboutUs";
import { Home } from "./Pages/Home";
import { Donate } from "./Pages/Donate";
import { NotFound } from "./Pages/NotFound";
import { Artists } from "./Pages/Artists";
import { Contact } from "./Pages/Contact";
import { Profile } from "./Pages/Profile";
import { ImageSlider } from "./Components/HomePage/ImageSlider";
import { IsAuth } from "./Components/UserAuth/IsAuth";

function App() {
	const UserAuth = IsAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar auth={UserAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<ImageSlider />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

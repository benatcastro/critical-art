//ROUTER
import { BrowserRouter} from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { IsAuth } from "./Components/UserAuth/IsAuth";
import { Paths } from "./Routes";

function App() {
	const UserAuth = IsAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar auth={UserAuth} />
		<Paths />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import Navmenu from "./Components/Navmenu";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Statistics from "./Pages/Statistics";
function App() {
  return (
    <div className="App">
      <Navmenu />
      <div className="page_container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import Navmenu from "./Components/Navmenu";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Statistics from "./Pages/Statistics";
import Create from "./Pages/Create";
function App() {
  return (
    <div className="App">
      <Navmenu />
      <div className="page_container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="create_patient" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

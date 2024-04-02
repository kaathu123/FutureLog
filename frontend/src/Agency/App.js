import Home from "./Pages/home/Home";
import {  Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {  Card } from "@mui/material";
import Agency from "./Agency";
import Packageschema from "./Packageschema";
import Requestpage from "./Requestpage";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbarr";

const styles = {
  margin: 2,
  height: '75vh',
  overflowY: 'scroll', // Allow scrolling
  padding: 3,
  borderRadius: 5,
  // Hide the default scrollbar
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div >
        <div className="homeMain">
      <Sidebar />
      <div className="homeContainerAdmin">
        <Navbar />
          <Card sx={styles}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Agency" element={<Agency />} />
            <Route path="/Packageschema" element={<Packageschema/>}/>
            <Route path="/Requestpage" element={<Requestpage/>}/>
      


          </Routes>
          </Card>
          
      </div>
    </div>
    </div>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import College from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"


function App()
{
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/colleges" element={<List/>}/>
      <Route path="/colleges/:id" element={<College/>}/>
      <Route path="/Login" element={<Login/>}/>
     
    </Routes>
  )
}
export default App;
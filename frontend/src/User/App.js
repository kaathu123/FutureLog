import { BrowserRouter, Route, Routes } from "react-router-dom";
import College from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Feedback from "./pages/Feedback";
import ViewColleges from "./pages/ViewColleges";



function App()
{
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/colleges" element={<List/>}/>
      <Route path="/colleges/:id" element={<College/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path='/Feedback' element={<Feedback/>}/>
      {/* <Route path='/Complaint' element={<Complaint/>}/> */}
      <Route path='/viewcolleges' element={<ViewColleges/>}/>
      
    </Routes>
  )
}
export default App;
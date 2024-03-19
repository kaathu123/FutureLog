import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/App';
import Guest from './Guest/App';
import User from './User/App';
import Agency from './Agency/style/App';
import Sidebar from '../src/Admin/components/sidebar/Sidebar';
import Navbar from '../src/Admin/components/navbar/Navbar';




const App = () => {
  return (
    <div className="homeMain">
        <Sidebar />
      <div className="homeContainerAdmin">
          <Navbar />
      <Routes>
        <Route path='/Admin/*' element={<Admin />}></Route>
        <Route path='/Guest/*' element={<Guest />}></Route>
        <Route path='/User/*' element={<User />}></Route>
        <Route path='/Agency/*' element={<Agency/>}></Route>


      </Routes>

    </div>
    </div>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/App';
import Guest from './Guest/App';
import User from './User/App';
import Agency from './Agency/style/App';





const App = () => {
  return (
  
        <Routes>
          <Route path='/Admin/*' element={<Admin />}></Route>
          <Route path='/Guest/*' element={<Guest />}></Route>
          <Route path='/User/*' element={<User />}></Route>
          <Route path='/Agency/*' element={<Agency />}></Route>


        </Routes>

  )
}

export default App
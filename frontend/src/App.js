import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/App';
import Guest from './Guest/App';
import User from './User/App';
import Agency from './Agency/App';
import College from './College/App'






const App = () => {
  return (
  
        <Routes>
          <Route path='/Admin/*' element={<Admin />}/>
          <Route path='/Guest/*' element={<Guest />}/>
          <Route path='/User/*' element={<User />}/>
          <Route path='/Agency/*' element={<Agency />}/>
          <Route path='/College/*' element={<College />}/>
          



        </Routes>

  )
}

export default App
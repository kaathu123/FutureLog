import React from 'react'
import {Route,Routes} from 'react-router-dom'
// import College from './Pages/College'
import User from './Pages/User';
import Login from './Pages/Login';


const App = () => {
  return (
    <div>
<Routes>
  {/* <Route path='/College' element={<College/>}/> */}
  <Route path='/User' element={<User/>}/>
  <Route path='/Login' element={<Login/>}/>
</Routes>
</div>
  )
}

export default App
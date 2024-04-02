import React from 'react'
import {Route,Routes} from 'react-router-dom'
// import College from './Pages/College'
import User from './Pages/User';
import Login from './Pages/Login';
import CollegeRegistration from './Pages/CollegeRegistration'
import Agency from './Pages/AgencyRegistration';

const App = () => {
  return (
    <div>
<Routes>
  {/* <Route path='/College' element={<College/>}/> */}
  <Route path='/UserRegistration' element={<User/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/CollegeRegistration' element={<CollegeRegistration/>}/>
  <Route path="/AgencyRegistration" element={<Agency/>}/>


</Routes>
</div>
  )
}

export default App
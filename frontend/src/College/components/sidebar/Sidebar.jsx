import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import StoreIcon from '@mui/icons-material/Store'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import { useContext } from 'react'
import { Box, Card, Typography } from '@mui/material'

const styles = {
   height: '75vh',
   overflowY: 'scroll', // Allow scrolling
  py:4,
   
   // Hide the default scrollbar
   scrollbarWidth: 'none',
   '-ms-overflow-style': 'none',
   '&::-webkit-scrollbar': {
      display: 'none',
   },
}
const Sidebar = () => {
   const { dispatch } = useContext(DarkModeContext)
   return (
      <Card
         className='sidebar'
         sx={{ height: '85vh',   margin: 2, padding: 3,borderRadius: 5
        }}
      >
         <div className='top'>
            <Link
               to='/'
               style={{ textDecoration: 'none' }}
            >
               <Typography
                  variant='h4'
                  textAlign={'center'}
                  sx={{ p: 2, m: 5 }}
                  className='dancing-script'
               >
                  FutureLog
               </Typography>
            </Link>
         </div>
         {/* <hr /> */}
         <Box sx={styles}>
            <div className='center'>
               <ul>
                  <p className='title'>MAIN</p>
                  <Link      to='/admin'
                     style={{ textDecoration: 'none' }}>
                  <li>
                     <DashboardIcon className='icon' />
                     <span>Dashboard</span>
                  </li></Link>
                  <p className='title'>LISTS</p>
                  <Link
                     to='/college/Collegecourse'
                     style={{ textDecoration: 'none' }}
                  >
                     <li>
                        <PersonOutlineIcon className='icon' />
                        <span>Add Course</span>
                     </li>
                  </Link>
                  <Link
                     to='/admin/category'
                     style={{ textDecoration: 'none' }}
                  >
                     <li>
                        <StoreIcon className='icon' />
                        <span>Stream</span>
                     </li>
                  </Link>
                  <Link
                     to='/admin/course'
                     style={{ textDecoration: 'none' }}
                  >
                  <li>
                     <CreditCardIcon className='icon' />
                     <span>Course</span>
                  </li></Link>
                  <Link
                     to='/admin/district'
                     style={{ textDecoration: 'none' }}
                  >
                  <li>
                     <LocalShippingIcon className='icon' />
                     <span>District</span>
                  </li></Link>



                  <Link
                     to='/admin/place'
                     style={{ textDecoration: 'none' }}
                  >
                  <li>
                     <LocalShippingIcon className='icon' />
                     <span>Place</span>
                  </li></Link>
                  <p className='title'>USEFUL</p>
                  <li>
                     <InsertChartIcon className='icon' />
                     <span>Stats</span>
                  </li>
                  <li>
                     <NotificationsNoneIcon className='icon' />
                     <span>Notifications</span>
                  </li>
                  <p className='title'>SERVICE</p>
                  <li>
                     <SettingsSystemDaydreamOutlinedIcon className='icon' />
                     <span>System Health</span>
                  </li>
                  <li>
                     <PsychologyOutlinedIcon className='icon' />
                     <span>Logs</span>
                  </li>
                  <li>
                     <SettingsApplicationsIcon className='icon' />
                     <span>Settings</span>
                  </li>
                  
                  <p className='title'>USER</p>
                  <Link
                     to='/admin/Myprofile'
                     style={{ textDecoration: 'none' }}
                  >
                  <li>
                     <AccountCircleOutlinedIcon className='icon' />
                     <span>Profile</span>
                  </li></Link>
                  <li>
                     <ExitToAppIcon className='icon' />
                     <span>Logout</span>
                  </li>
               </ul>
            </div>
            <div className='bottom'>
               <div
                  className='colorOption'
                  onClick={() => dispatch({ type: 'LIGHT' })}
               ></div>
               <div
                  className='colorOption'
                  onClick={() => dispatch({ type: 'DARK' })}
               ></div>
            </div>
         </Box>
      </Card>
   )
}

export default Sidebar

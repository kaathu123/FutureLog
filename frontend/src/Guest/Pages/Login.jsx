import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      email,
      password,
    }
    axios.post('http://localhost:5000/Login',data)
    .then((response) => {
      console.log('post request successful',response.data)
      const data = response.data;
      if (data.login === 'admin') {
        sessionStorage.setItem('aId', data.id)
        navigate('../../Admin')
     } else if (data.login === 'user') {
        sessionStorage.setItem('uId', data.id)
        navigate('../../User')
     } else if (data.login === 'college') {
        sessionStorage.setItem('cId', data.id)
        navigate('../../College')
     }
     else if (data.login === 'agency') {
      console.log(response.data);
      sessionStorage.setItem('agId', data.id)
      navigate('../../Agency')
   }
    })
    .catch((error)=>{
      console.error('error',error)
    });
  }

  return (
    <div>
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
      >
        <Card
          sx={{
            display: "flex",
            height: 300,
            width: 500,
            justifyContent: "center",
            px: 5,
          }}
          component={'form'} onSubmit={handleSubmit}
        >
          <Box>
            <Stack spacing={2} direction="column" sx={{ m: 2 }}>
              <Typography
               variant="h4" sx={{ m: 4 }}
              >
                Login
              </Typography>
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                onChange={(event)=>setEmail(event.target.value)}
              />
               <TextField





id="outlined-password-input"
label="Password"
type="Text"
autoComplete="current-password"
onChange={(event) => setPassword(event.target.value)}

/>
              <Button variant="contained" type="submit">Login</Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </div>
  );
};
export default Login;

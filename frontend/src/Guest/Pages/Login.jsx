import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');
  const handleSubmit = (event) => {
    event.preventDefault()
    const postData = {
      name,
      password,
    }
    axios.post('http://localhost:5000/Login',postData)
    .then((response) => {
      console.log('post request successful',response.data)
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
                label="Username"
                variant="outlined"
                onChange={(event)=>setName(event.target.value)}
              />
               <TextField

id="outlined-password-input"
label="Password"
type="Text"
autoComplete="current-password"
onChange={(event) => setPassword(event.target.value)}

/>
              <Button variant="contained">Login</Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </div>
  );
};
export default Login;

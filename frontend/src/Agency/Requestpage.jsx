
// import { styled } from '@mui/material/styles';

import axios from 'axios';
import React, { useState } from "react";


import { Box,Card,Stack,Button, Typography, formControlClasses, TextField } from "@mui/material";
// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

 
const Requests = () => {
    const [request,setRequest] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault()
        const postData = {
         request:request,
        }
        axios.post('http://localhost:5000/Requestpage',postData)
        .then((response) => {
          console.log('post request successful',response.data)
        })
        .catch((error)=>{
          console.error('error',error)
        });
    }


return(
    <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }} component={"form"} >
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px', height: 700 }}component={'form'} onSubmit={handleSubmit}>
    
        <Stack direction={'column'} spacing={4}>
        <Typography variant="h3" sx={{ m: 4 }}>
            Request
        </Typography>
        <TextField id="standard-basic"  type="date" variant="standard" onChange={(event) => setRequest(event.target.value)}/>
<Button variant="contained" type="submit">Save</Button>

            </Stack>
        </Card>
  
        
    </Box>
)
}
export default Requests
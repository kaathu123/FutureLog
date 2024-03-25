import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,TextField,Card,Stack,Button, Typography } from "@mui/material";
import axios from "axios";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

 
const Agency = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [address,setAddress]=useState('');
    const [files,setFiles]=useState('');
    const [proof,setProof]=useState('');
   
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        name:name,
        email:email,
        password:password,
        address:address,
        files:files,
        proof:proof,
      }; //usestate and schema name wrapped as object and it assigned to variable data
      axios.post('http://localhost:5000/Agency',data)
      .then((response) => {
        console.log('post request successful',response.data)
      })
      .catch((error)=>{
        console.error('error',error)
      });
    }
return(
    <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px', height: 700 }}component={'form'} onSubmit={handleSubmit}>
       
        <Stack direction={'column'} spacing={4}>
        <Typography variant="h3" sx={{ m: 4 }}>
            Agency Registration
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
        <TextField

          id="outlined-password-input"
          label="Password"
          type="Text"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}

          />
           <TextField
          id="outlined-multiline-flexible"
          label="Address"
          multiline
          maxRows={4}
          onChange={(event) => setAddress(event.target.value)}

        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}       >
  Upload file
  <VisuallyHiddenInput type="file" onChange={(event)=>setFiles(event.target.files)}/>
  {/* onChange={(event) => setFiles(event.target.value)} */}
</Button>
<Button component="label" variant="contained" startIcon={<CloudUploadIcon />  }>
  Upload proof
  <VisuallyHiddenInput type="file" onChange={(event)=>setProof(event.target.files)}/>
  {/* onChange={(event) => setProof(event.target.value)} */}
</Button>
<Button variant="contained" type="submit">Save</Button>

            </Stack>
        </Card>
        </Box>
)
}
export default Agency
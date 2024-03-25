import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { Box,TextField,Card,Stack,Button,Typography, } from "@mui/material";
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

 
const Packages = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [details,setDetails] = useState('');
    const [files,setFiles]=useState('');

    const handleSubmit=(event) => {
      event.preventDefault()
      const postData={
        name:name,
        price:price,
        details:details,
        files:files,

      }
      axios.post('http://localhost:5000/Packageschema',postData)
      .then((response)=>{
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
         Packages
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField

          id="outlined-password-input"
          label="price"
          type="Text"
          autoComplete="current-password"
          onChange={(event) => setPrice(event.target.value)}

          />
           <TextField
          id="outlined-multiline-flexible"
          label="Details"
          multiline
          maxRows={4}
          onChange={(event) => setDetails(event.target.value)}
        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file" onChange={(event)=>setFiles(event.target.files)} />
</Button>
<Button variant="contained" type="submit">Save</Button>


            </Stack>
        </Card>
        
        
    </Box>
)
}
export default Packages
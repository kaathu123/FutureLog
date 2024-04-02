import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { Box,TextField,Card,Stack,Button,Typography, TableCell, TableBody, TableContainer, Paper, Table, TableHead, TableRow, } from "@mui/material";
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
    const [files,setFiles] = useState('');
    const [details,setDetails] = useState('');
    const [price,setPrice] = useState('');
    const [agencyId,setAgencyId] = useState('');
    const [packageData,setPackageData] = useState([]);
    const [agencyData, setAgencyData] = useState ([]);


    const handleSubmit=(event) => {
      event.preventDefault()
      const postData={
        packagename:name,
        file:files,
        details:details,
        agencyId:agencyId,
        price:price,
      }
  
      axios.post('http://localhost:5000/Package',postData)
      .then((response)=>{
        console.log('post request successful',response.data)
        setName('');
        setDetails('');
        setPrice('');
        setFiles('');
        setAgencyId('');
        fetchPackage();
      })
      .catch((error)=>{
        console.error('error',error)
      });
    }
  
     
    const fetchPackage = () => {
      axios.get('http://localhost:5000/Package').then((response) => {
        console.log(response.data.packages);
        setPackageData(response.data.packages);
      }).catch((error) => {
        console.error('Error fetching course data:', error);
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
          type="Number"
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
     <TextField id="outlined-basic" label="file" variant="outlined" onChange={(event) => setFiles(event.target.value)} />
<Button variant="contained" type="submit">Save</Button>


            </Stack>
        </Card>
        <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center"> Name</TableCell>
              <TableCell align="right">details</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">file</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {packageData.map((Package, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {Package.packagename},
                  {Package.details},
                  {Package.price},
                  {Package.file},
                </TableCell>
                {/* <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleDelete(Package._id) }>Delete</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
    </Box>
)
}
export default Packages
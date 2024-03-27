import React, { useEffect, useState } from "react";
import { Box, Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";
import axios from 'axios';




const District = () => {
  const[district,setDistrict] = useState('');
  const [districtData,setDistrictData] = useState([]);
  const [singleDistrict,setSingleDistrict] =useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()

    const postData = {
      districtname: district, 
    }
    if(singleDistrict == null){
    axios.post('http://localhost:5000/District/', postData)
    .then((response) => {
      console.log('POST request successful:', response.data);
      setDistrict();
      fetchDistrict();
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
    });
  }
else{
  axios.put(`http://localhost:5000/District/${singleDistrict}`, postData)
  .then((response) => {
    console.log("Updated successfully", response);
    setDistrict("");
    fetchDistrict();
    setSingleDistrict(null)
  })
  .catch((error) => {
    console.error("Error updating category data:", error);
  });
}

}

  const fetchDistrict = () => {
    axios.get('http://localhost:5000/District').then((response)=>{
    console.log(response.data.districts);
    setDistrictData(response.data.districts)
    })
   . catch((error)=>{
      console.error('Error fetching district data:', error);
    })
}
  const handleFetchSingleDistrict = (id) => {
    axios.get(`http://localhost:5000/District/${id}`)
    .then((response)=>{
    const data = response.data.districts
    setSingleDistrict(data._id);
      setDistrict(data.districtname)
      })
     . catch((error)=>{
        console.error('Error fetching district data:', error);
      })
    
  }
  useEffect(()=>{
    fetchDistrict()

  },[])

  const handleDelete = (Id) => {
    axios.delete(`http://localhost:5000/District/${Id}`)
    .then((response) => {
      console.log('Deleted successfully', response);
      fetchDistrict();
    })
    . catch((error)=>{
      console.error('Error fetching district data:', error);
    })
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center",alignItems:'center',height:'100vh',flexDirection:'column' } }>
      <Card sx={{width:400,height:250,display:'flex',justifyContent:'center',px:5}} component={'form'} onSubmit={handleSubmit}>
        <Box>

        <Typography variant="h4" sx={{ m: 4 }}>
          District
        </Typography>
        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
        <TextField id="standard-basic" label="District" variant="standard" 
        onChange={(event)=>setDistrict(event.target.value)}/>
        <Button variant="contained" type="submit">Save</Button>
        </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center">District Name</TableCell>
              <TableCell align="right">Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {districtData.map((district, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {district.districtname}
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleDelete(district._id) }>Delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleFetchSingleDistrict(district._id) }>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default District;

import React, { useEffect, useState } from "react";
import { Box, Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import { TextField, Button } from "@mui/material";
import axios from 'axios';




const viewColleges = () => {

  const [collegeData,setCollegeData] = useState([]);


 


  const fetchColleges = () => {
    axios.get('http://localhost:5000/college').then((response)=>{
    console.log(response.data.colleges);
    setCollegeData(response.data.colleges)
    })
   . catch((error)=>{
      console.error('Error fetching district data:', error);
    })
}

  useEffect(()=>{
    fetchColleges()

  },[])

  return (
    <Box sx={{ display: "flex", justifyContent: "center",alignItems:'center',height:'100vh',flexDirection:'column' } }>
      <Card sx={{width:400,height:250,display:'flex',justifyContent:'center',px:5}}>
        <Box>

        <Typography variant="h4" sx={{ m: 4 }}>
    view Colleges
        </Typography>
        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
        </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center">College Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Proof</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">District</TableCell>
              <TableCell align="center">Place</TableCell>
             

            </TableRow>
          </TableHead>
          <TableBody>
            {collegeData.map((college, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.email}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.address}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                 <img src={college.proof}/>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.number}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.placeId.placename}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {college.placeId.districtId.districtname}
                </TableCell>
                
           
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default viewColleges;

import {
    Box,
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  
  
  const CollegeApproval = () => {
   
 
    const [collegeData, setCollegeData] = useState([]);
    const [PlaceData,setPlaceData] = useState([]);
    const [districtData,setDistrictData] = useState([]);
   
  
    const fetchCollege = () => {
      axios.get('http://localhost:5000/college').then((response)=>{
      console.log(response.data.colleges);
      setCollegeData(response.data.colleges)
      })
     . catch((error)=>{
        console.error('Error fetching colleges data:', error);
      })
    }
  
    const fetchPlace = () => {
      axios.get('http://localhost:5000/Place').then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      }).catch((error) => {
        console.error('Error fetching place data:', error);
      });
    }
    const fetchDistrict = () => {
      axios.get('http://localhost:5000/District').then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      }).catch((error) => {
        console.error('Error fetching districts data:', error);
      });
    }

    // const handleFetchSingleCourse = (id) => {
    //   axios.get(`http://localhost:5000/Course/${id}`)
    //   .then((response)=>{
    //   const data = response.data.courses
    //   setSingleCourse(data._id);
    //     setCourseName(data.coursename)
    //     })
    //    . catch((error)=>{
    //       console.error('Error fetching course data:', error);
    //     })
      
    // }
    useEffect(()=>{
      fetchCollege()
      fetchDistrict()
      fetchPlace()
    },[])
  
  
  
    const handleDelete = (Id) => {
      axios.delete(`http://localhost:5000/college/${Id}`)
      .then((response) => {
        console.log('Deleted successfully', response);
        fetchCollege();
      })
      . catch((error)=>{
        console.error('Error fetching colleges data:', error);
      })
    }
    
  
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          // sx={{
          //   display: "flex",
          //   height: 300,
          //   width: 400,
          //   justifyContent: "center",
          //   alignItems: "center",
          //   px: 5,
            
          // }}
       
        >
          <Box>
            <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
              <Typography variant="h3" sx={{ m: 5 }}>
          CollegeApproval
              </Typography>
            </Stack>
          </Box>
        </Card>
        <TableContainer component={Paper} sx={{ m:4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell >Sl No</TableCell>
                <TableCell align="center"> Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">pincode</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Proof</TableCell>
                <TableCell align="right">Place</TableCell>
                <TableCell align="right">District</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {/* {PlaceData.map((place, key) => (
                  <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                 < TableCell>{key+1}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {place.districtId.districtname}
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                </TableRow>   
              ))} */}
              {collegeData.map((college, key) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                 < TableCell>{key+1}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {college.name}
                  </TableCell>
                  <TableCell align="right">{college.email}</TableCell>
                  <TableCell align="right">{college.number}</TableCell> 
                  <TableCell align="right">{college.address}</TableCell>
                  <TableCell align="right">{college.proof}</TableCell>
                  <TableCell align="right">{college.placeId.placename}</TableCell>
                  <TableCell align="right">{college.placeId.districtId.districtname}</TableCell>

                  <Button variant="outlined" onClick={() =>handleDelete(college._id) }>Delete</Button>

                  </TableRow>
                   ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  
  }
          
  export default CollegeApproval;
  
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


const Course = () => {
  const[name,setName]=useState('');
  const[categoryid,setCategoryid]=useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [courseData, setCourseData] = useState ([]);
  const handleSubmit = (event)=>{
    event.preventDefault();
    const postData= {
      name:name, 
    }
    axios.post('http://localhost:5000/course',postData)
    .then((response)=>{
      console.log(response.data);
      setName('')
      setCategoryid('')

    })
    .catch((error)=> {
console.error('error',error);
    })
  }


  const fetchCategory = () => {
    axios.get('http://localhost:5000/category').then((response)=>{
    console.log(response.data.categorys);
    setCategoryData(response.data.categorys)
    })
   . catch((error)=>{
      console.error('Error fetching district data:', error);
    })
  }


  const fetchCourse = () => {
    axios.get('http://localhost:5000/course').then((response) => {
      console.log(response.data.courses);
      setCourseData(response.data.courses);
    }).catch((error) => {
      console.error('Error fetching course data:', error);
    });
  }
  useEffect(()=>{
    fetchCategory()
    fetchCourse()
  },[])


  

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
        sx={{
          display: "flex",
          height: 300,
          width: 400,
          justifyContent: "center",
          alignItems: "center",
          px: 5,
          
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
            <Typography variant="h3" sx={{ m: 5 }}>
              Course
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="category"
                // onChange={handleChange}
                onChange={(event)=>setCategoryid(event.target.value)}
                value={categoryid}

              >

                {/* //view list of details */}
                {categoryData.map((category, key) => ( 
                  <MenuItem key={key} value={category._id}
                  >
                  {category.categoryname}
                </MenuItem>
                ))}
               
              </Select>
            </FormControl>{" "}
            <TextField
              id="standard-basic"
              label="Course Name"
              variant="standard"
              onChange={(event)=>setName(event.target.value)}
            />
            <Button variant="contained">Save</Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categary Name</TableCell>
              <TableCell align="right">Course Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseData.map((course, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {course.categoryname}
                </TableCell>
                <TableCell align="right">{course.coursename}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Course;

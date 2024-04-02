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
  const[coursename,setCourseName]=useState("");
  const[categoryId,setCategoryId]=useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [courseData, setCourseData] = useState ([]);
  const [singleCourse,setSingleCourse] = useState(null);
  const handleSubmit = (event)=>{
    event.preventDefault();

    const postData= {
      coursename, 
      categoryId
    }
if(singleCourse == null){
    axios.post('http://localhost:5000/Course',postData)
    .then((response)=>{
      console.log(response.data);
      setCourseName('')
      setCategoryId('')
      fetchCourse();

    })
    .catch((error)=> {
    console.error('error',error);
    })
  }

else{
  axios.put(`http://localhost:5000/Course/${singleCourse}`, postData)
  .then((response) => {
    console.log("Updated successfully", response);
    setCourseName("");
    fetchCourse();
    setSingleCourse(null)
  })
  .catch((error) => {
    console.error("Error updating course data:", error);
  });
}
}


  const fetchCategory = () => {
    axios.get('http://localhost:5000/Category').then((response)=>{
    console.log(response.data.categorys);
    setCategoryData(response.data.categorys)
    })
   . catch((error)=>{
      console.error('Error fetching district data:', error);
    })
  }


  const fetchCourse = () => {
    axios.get('http://localhost:5000/Course').then((response) => {
      console.log(response.data.courses);
      setCourseData(response.data.courses);
    }).catch((error) => {
      console.error('Error fetching course data:', error);
    });
  }
  const handleFetchSingleCourse = (id) => {
    axios.get(`http://localhost:5000/Course/${id}`)
    .then((response)=>{
    const data = response.data.courses
    setSingleCourse(data._id);
      setCourseName(data.coursename)
      })
     . catch((error)=>{
        console.error('Error fetching course data:', error);
      })
    
  }
  useEffect(()=>{
    fetchCategory()
    fetchCourse()
  },[])



  const handleDelete = (Id) => {
    axios.delete(`http://localhost:5000/Course/${Id}`)
    .then((response) => {
      console.log('Deleted successfully', response);
      fetchCourse();
    })
    . catch((error)=>{
      console.error('Error fetching district data:', error);
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
                onChange={(event)=>setCategoryId(event.target.value)}
                value={categoryId}

              >

                {/* //view list of details */}
                {categoryData.map((category, key) => ( 
                  <MenuItem key={key} value={category._id}>
                  {category.categoryname}
                </MenuItem>
                ))}
               
              </Select>
            </FormControl>{" "}
            <TextField
              id="standard-basic"
              label="Course Name"
              variant="standard"
              onChange={(event)=>setCourseName(event.target.value)}
            />
            <Button variant="contained" type="submit">Save</Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center">Categary Name</TableCell>
              <TableCell align="right">Course Name</TableCell>
              <TableCell align="right">Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {courseData.map((course, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {course.categoryId.categoryname}
                </TableCell>
                <TableCell align="right">{course.coursename}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleDelete(course._id) }>Delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleFetchSingleCourse(course._id) }>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Course;

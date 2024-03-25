import React, { useEffect, useState } from "react";
import { Box, Button, Card, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Collegecourse = () => {
  const [collegeId, setcollegeId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [collegeData, setCollegeData] = useState([]);
  const [courseData, setCourseData] = useState([]);



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
     collegename:collegeId,
     coursename:courseId,
    }; //usestate and schema name wrapped as object and it assigned to variable data
    axios.post('http://localhost:5000/Collegecourse', data)
    .then((response) => {
      console.log(response.data);
      setcollegeId('')
    
    })
  }


  const fetchCollege = () => {
    axios.get(`http://localhost:5000/College/`).then((response) => {
      console.log(response.data.colleges);
      setCollegeData(response.data.colleges) 
    })
    .catch((error) => {
      console.error('Error fetching  data:', error);
    });
  }
  
  const fetchCourse = () => {
    axios.get(`http://localhost:5000/Course/`).then((response) => {
      console.log(response.data.courses);
      setCourseData(response.data.courses)
    })
    .catch((error) => {
      console.error('Error fetching  data:', error);
    });
  }


  useEffect(() => {
    fetchCollege()
    fetchCourse()
 }, [])
  return (
    <Box  sx={{ display: "flex", justifyContent: "center",alignItems:'center',height:'100vh',flexDirection:'column' }}>
      <Card 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
        component={'form'} onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            height: 250,
            width: 400,
            justifyContent: "center",
            px: 5,
          }}

        >
          <Stack spacing={2} direction={"column"} sx={{ m: 4 }}>
            <Typography variant="h3" sx={{ m: 4 }}>
              Place
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">collegecourse</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="college"
                // onChange={handleChange}
                onChange={(event)=>setcollegeId(event.target.value)}
                value={collegeId}
              >
              {/* //view list of districts  */}
               {collegeData.map((college, key) => (
                  <MenuItem key={key} value={college._id}
               >
                  {college.collegename}
               </MenuItem>
                ))}

              </Select>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="course"
                // onChange={handleChange}
                onChange={(event)=>setCourseId(event.target.value)}
                value={courseId}
              >
              {/* //view list of districts  */}
               {courseData.map((courseId, key) => (
                  <MenuItem key={key} value={course._id}
               >
                  {course.coursename}
               </MenuItem>
                ))}

              </Select>
            </FormControl>
            <Button variant="contained" type="submit">Save</Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
    </Box>
  );
};
export default Collegecourse;

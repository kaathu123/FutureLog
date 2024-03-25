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

const Coursebooking = () => {
  const [collegecourseId, setCollegeCourseId] = useState('');
  const [userId, setUserId] = useState('');

  const [price, setPrice] = useState('');
  const [collegecourseData, setCollegecourseData] = useState([]);
  const [userData, setUserData] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        collegecourseId:collegecourseId,
        userId:userId,
        price:price,

    }; //usestate and schema name wrapped as object and it assigned to variable data
    axios.post('http://localhost:5000/Coursebooking', data)
    .then((response) => {
      console.log(response.data);
      setCollegeCourseId('')
      setPrice('')
      userId('')
    })
  }


  const fetchCollegecourse = () => {
    axios.get(`http://localhost:5000/Collegecourse/`).then((response) => {
      console.log(response.data.collegecourses);
      setCollegecourseData(response.data.collegecourses) 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
  const fetchUser = () => {
    axios.get(`http://localhost:5000/User/`).then((response) => {
      console.log(response.data.users);
      setUserData(response.data.users) 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }


  useEffect(() => {
    fetchDistrict()
    fetchUser()
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
              <InputLabel id="demo-simple-select-label">collegebooking</InputLabel>
              <TextField
              id="outlined-basic"
              label="price"
              variant="outlined"
              onChange={(event)=>setPrice(event.target.value)}
            />
              <TextField
              id="outlined-basic"
              label="userid"
              variant="outlined"
              onChange={(event)=>setUserId(event.target.value)}
            />
              <TextField
              id="outlined-basic"
              label="collecourseid"
              variant="outlined"
              onChange={(event)=>setCollegeCourseId(event.target.value)}
            />

            </FormControl>
            <TextField id="standard-basic" label="Place" variant="standard"   onChange={(event) => setPrice(event.target.value)} value={placeName}/>
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
export default Coursebooking;

import React, { useState } from "react";
import { Box, Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";
import axios from 'axios';


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
  

const District = () => {
  const[district,setDistrict] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()

    const postData = {
      districtname: district, 
    }
    
    axios.post('http://localhost:5000/District/', postData)
    .then((response) => {
      console.log('POST request successful:', response.data);
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
    });
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
        <TableBody>
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
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default District;
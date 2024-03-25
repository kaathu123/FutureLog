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

const Place = () => {
  const [districtId, setDistrictId] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [districtData, setDistrictData] = useState([]);
  const [placeData, setPlaceData] = useState([]);



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      placename: placeName,
      districtId
    }; //usestate and schema name wrapped as object and it assigned to variable data
    axios.post('http://localhost:5000/Place', data)
    .then((response) => {
      console.log(response.data);
      setDistrictId('')
      setPlaceName('')
      fetchPlace()
    })
  }


  const fetchDistrict = () => {
    axios.get(`http://localhost:5000/District/`).then((response) => {
      console.log(response.data.districts);
      setDistrictData(response.data.districts) //state update erkm then kollam
    })
    .catch((error) => {
      console.error('Error fetching district data:', error);
    });
  }
  
  const fetchPlace = () => {
    axios.get(`http://localhost:5000/Place`).then((response) => {
      console.log(response.data.places);
      setPlaceData(response.data.places) //state update erkm then kollam
    })
    .catch((error) => {
      console.error('Error fetching places data:', error);
    });
  }


  useEffect(() => {
    fetchDistrict()
    fetchPlace()
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
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Place"
                // onChange={handleChange}
                onChange={(event)=>setDistrictId(event.target.value)}
                value={districtId}
              >
              //view list of districts 
               {districtData.map((district, key) => (
                  <MenuItem key={key} value={district._id}
               >
                  {district.districtname}
               </MenuItem>
                ))}

              </Select>
            </FormControl>
            <TextField id="standard-basic" label="Place" variant="standard"   onChange={(event) => setPlaceName(event.target.value)} value={placeName}/>
            <Button variant="contained" type="submit">Save</Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center">District Name</TableCell>
              <TableCell align="right">Place Name</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {placeData.map((place , key) => (
           <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {place.districtId.districtname}
                </TableCell>
                <TableCell align="right">{place.placename}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};
export default Place;

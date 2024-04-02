import React, { useEffect, useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography,Select,MenuItem, InputLabel, FormControl } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import styled from "@emotion/styled";
import axios from "axios";
// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const College = () => {
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[address,setAddress]=useState('');
  const[proof,setProof]=useState('');
  const[number,setNumber]=useState('');
  const [placeId, setPlaceId] = useState('');
  const [placeData, setPlaceData] = useState([]);
  const [districtId, setDistrictId] = useState('');
  const [districtData, setDistrictData] = useState([]);


  const fetchPlace = (Id) => {
    axios.get(`http://localhost:5000/Place/${Id}`).then((response) => {
      console.log(response.data.places);
      setPlaceData(response.data.places) 
    })
    .catch((error) => {
      console.error('Error fetching place data:', error);
    });
  }
  const fetchDistrict = () => {
    axios.get('http://localhost:5000/District').then((response) => {
      console.log(response.data.districts);
      setDistrictData(response.data.districts) 
    })
    .catch((error) => {
      console.error('Error fetching place data:', error);
    });
  }



  useEffect(() => {
    fetchDistrict()
 }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      address,
      number,
      proof,
      placeId,
      districtId
    }; //usestate and schema name wrapped as object and it assigned to variable data
    
    axios.post('http://localhost:5000/college', data)
    .then((response) => {
      console.log(response.data);
      setName("")
      setEmail("")
      setPassword("")
      setAddress("")
      setProof("")
      setNumber("")
      setPlaceId("")
      setDistrictId("")
      fetchDistrict()
      fetchPlace()
    })
  }


  return (
    <Box
      sx={{
        display: "flex",
        height: "200vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 800,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        component={'form'} onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 3 }}>
            <Typography variant="h3" sx={{ m: 4 }}>
              College Registration Form
            </Typography>
            <TextField
              id="outlined-basic"
              label="College Name"
              variant="outlined"
              onChange={(event)=>setName(event.target.value)}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event)=>setEmail(event.target.value)} />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event)=>setPassword(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event)=>setAddress(event.target.value)}
            />
            <TextField
          id="outlined-number"
          label="Phone Number"
          type="number"
          InputLabelProps={{
            shrink: true,
           
          }}
          onChange={(event)=>setNumber(event.target.value)}
        />
         <FormControl>
        <InputLabel id="please select place">district </InputLabel>
        <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Place"
                // onChange={handleChange}
                onChange={(event)=>{
                  setDistrictId(event.target.value)
                  fetchPlace(event.target.value)
                }}
                value={districtId}
              >
              {/* //view list of districts  */}
               { districtData.map((district, key) => (
                  <MenuItem key={key} value={district._id}
               >
                  {district.districtname}
               </MenuItem>
                ))}

              </Select>
              </FormControl>
        <FormControl>
        <InputLabel id="please select place">place </InputLabel>
        <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Place"
                // onChange={handleChange}
                onChange={(event)=>setPlaceId(event.target.value)}
                value={placeId}
              >
              {/* //view list of districts  */}
               {placeData.map((place, key) => (
                  <MenuItem key={key} value={place._id}
               >
                  {place.placename}
               </MenuItem>
                ))}

              </Select>
              </FormControl>
             
              <TextField
              id="outlined-basic"
              label="proof"
              variant="outlined"
              onChange={(event)=>setProof(event.target.value)}
            />
            <Button variant="contained" type="submit">Save</Button>

          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default College;
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [photo, setPhoto] = useState("");
  const [PlaceId, setPlaceId] = useState("");
  const [DistrictId, setDistrictId] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const fetchPlace = (Id) => {
    axios
      .get(`http://localhost:5000/Place/${Id}`)
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  };

  const fetchDistrict = () => {
    axios
      .get("http://localhost:5000/District")
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const handleFilePhoto= (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const formData = new FormData();
    formData.append('username', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('useraddress', address);
    formData.append('userphone', phone);
    formData.append('userpincode', pincode);
    formData.append('userphoto', photo);
    formData.append('placeId', PlaceId);
    formData.append('districtId', DistrictId);
    axios
      .post("http://localhost:5000/User", formData)
      .then((response) => {
        console.log("goo fast", response.data);
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setPhone("");
        setPincode("");
        setPhoto("");
        setPlaceId("");
        setDistrictId("");
        fetchPlace(DistrictId);
        fetchDistrict();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "180vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 1000,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h3" sx={{ m: 4 }}>
            User Registration Form
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Phone Number"
              multiline
              maxRows={4}
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="PinCode"
              multiline
              maxRows={4}
              onChange={(event) => setPincode(event.target.value)}
            />
            <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="category"
                  // onChange={handleChange}
                  onChange={(event) => {
                    setDistrictId(event.target.value);
                    fetchPlace(event.target.value);
                  }}
                  value={DistrictId}
                >
                  {/* //view list of details */}
                  {districtData.map((district, key) => (
                    <MenuItem key={key} value={district._id}>
                      {district.districtname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="category"
                  // onChange={handleChange}
                  onChange={(event) => setPlaceId(event.target.value)}
                  value={PlaceId}
                >
                  {/* //view list of details */}
                  {placeData.map((place, key) => (
                    <MenuItem key={key} value={place._id}>
                      {place.placename} ({place.districtId.districtname})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                className="Photo"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Photo
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFilePhoto}
                />
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default User;
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (event) => {
    const postData = {
      username: name,
      email: email,
      password: password,
      useraddress: address,
      userphone: phone,
      userpincode: pincode,
      userphoto: photo,
      placeId: PlaceId,
      districtId: DistrictId,
    };

    axios
      .post("http://localhost:5000/User", postData)
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
              <TextField
                id="outlined-multiline-flexible"
                label="Photo"
                multiline
                maxRows={4}
                onChange={(event) => setPhoto(event.target.value)}
              />
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
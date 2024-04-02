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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

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

const Agency = () => {
  const [agencyName, setAgencyName] = useState("");
  const [email, setAgencyEmail] = useState("");
  const [password, setAgencyPassword] = useState("");
  const [agencyAddress, setAgencyAddress] = useState("");
  const [agencyPhoto, setAgencyPhoto] = useState("");
  const [agencyProof, setAgencyProof] = useState("");
  const [agencyPlaceId, setAgencyPlaceId] = useState("");
  const [agencyDistrictId, setAgencyDistrictId] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const fetchPlace = (Id) => {
    axios.get(`http://localhost:5000/Place/${Id}`)
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
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
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      agencyname: agencyName,
      email,
      password,
      address: agencyAddress,
      photo: agencyPhoto,
      proof: agencyProof,
      placeId: agencyPlaceId,
      districtId: agencyDistrictId,
    };
    axios
      .post("http://localhost:5000/Agency", postData)
      .then((response) => {
        console.log(response.data);
        setAgencyName("");
        setAgencyEmail("");
        setAgencyPassword("");
        setAgencyAddress("");
        setAgencyPhoto("");
        setAgencyProof("");
        setAgencyPlaceId("");
        setAgencyDistrictId("");
        fetchPlace(agencyDistrictId);
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
        height: "150vh",
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
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h3" sx={{ m: 4 }}>
            Agency Registration Form
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <TextField
              id="outlined-basic"
              label="Agency Name"
              variant="outlined"
              onChange={(event) => setAgencyName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setAgencyEmail(event.target.value)}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setAgencyPassword(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event) => setAgencyAddress(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Photo"
              multiline
              maxRows={4}
              onChange={(event) => setAgencyPhoto(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Proof"
              multiline
              maxRows={4}
              onChange={(event) => setAgencyProof(event.target.value)}
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
                    setAgencyDistrictId(event.target.value);
                    fetchPlace(event.target.value);
                  }}
                  value={agencyDistrictId}
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
                  onChange={(event) => setAgencyPlaceId(event.target.value)}
                  value={agencyPlaceId}
                >
                  {/* //view list of details */}
                  {placeData.map((place, key) => (
                    <MenuItem key={key} value={place._id}>
                      {place.placename} ({place.districtId.districtname})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
export default Agency;
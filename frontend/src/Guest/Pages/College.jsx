import React from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useState } from 'react'

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

const College = () => {
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const[address,setAddress] =useState('');
  const[proof,setProof]= useState('');

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 500,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <Typography variant="h3" sx={{ m: 4 }}>
              College Registration Form
            </Typography>
            <TextField
              id="outlined-basic"
              label="College Name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" />

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
              onChange={(event)=> setAddress(event.target.value)}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Proof
              <VisuallyHiddenInput type="file" onChange={(event)=>setProof(event.target.files[0])} />
            </Button>
            <Button variant="contained">Save</Button>

          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default College;

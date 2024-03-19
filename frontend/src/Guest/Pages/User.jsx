import React, { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
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
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[address,setAddress]=useState('');
  const[number,setNumber]=useState('');
  const[Photo,setPhoto]=useState('');

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
          height: 600,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 3 }}>
            <Typography variant="h3" sx={{ m: 4 }}>
              User Registration Form
            </Typography>
            <TextField
              id="outlined-basic"
              label="User Name"
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
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
           
          }}
          onChange={(event)=>setNumber(event.target.value)}
        />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Photo 
              <VisuallyHiddenInput type="file" onChange={(event)=>setPhoto(event.target.files)} />
            </Button>
            <Button variant="contained">Save</Button>

          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default College;

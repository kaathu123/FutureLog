import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
 
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";


const Feedback = () => {
 
  const [count, setCount] = useState("");
  const [feedbackcontent, setFeedbackContent] = useState("");
  const [userId, setUserId] = useState("");
  const [collegecourseId, setcollegecourseId] = useState("");
  // const [userData, setUserData] = useState([]);
  // const [collegecourseData, setcollegecourseData] = useState([]);


 
  
  
  // const fetchUser = (Id) => {
  //   axios
  //   .get(`http://localhost:5000/User/${Id}`)
  //   .then((response) => {
  //     console.log(response.data.users);
  //     setUserData(response.data.users);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching user details:", error);
  //   });
  // };
    
  // const fetchCollegeCourse = (Id) => {
  //   axios
  //   .get(`http://localhost:5000/CollegeCourse/${Id}`)
  //   .then((response) => {
  //     console.log(response.data.collegecourses);
  //     setcollegecourseId(response.data.collegecourses);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching collegecourses details:", error);
  //   });
  // };
  
  
  
  // useEffect(() => {
  //   fetchUser();
  //   fetchCollegeCourse();
  // }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      
      userId: userId,
      feedbackcontent:feedbackcontent,
      count:count,
      collegecourseId:collegecourseId
    };
    axios
      .post("http://localhost:5000/College", postData)
      .then((response) => {
        console.log(response.data);
       setCount('');
       setFeedbackContent('');
       setCount('');
        setUserId("");
        // fetchUser();
        setcollegecourseId('');
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };


  return (
    <Box
      sx={{
        display: "flex",
        height: "120vh",
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
        Feedback
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
         
          <TextField
          id="outlined-number"
          label="Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setCount(event.target.value)}

        />

            
            <TextField
              id="outlined-multiline-flexible"
              label="feedbackcontent"
              multiline
              maxRows={4}
              onChange={(event) => setFeedbackContent(event.target.value)}
            />

              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
        
        </Box>
      </Card>
    </Box>
  );
};
export default Feedback;

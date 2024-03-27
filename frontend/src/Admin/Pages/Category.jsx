import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
const Category = () => {
  const[categoryName, setCategoryName] = useState('');
  const [categoryData,setCategoryData]=useState([]);
  const [singleCategory,setSingleCategory]=useState(null);
const handleSubmit = (event)=>{
  event.preventDefault();

  const postData={
    categoryname:categoryName,
  }

  if(singleCategory === null){
    axios.post('http://localhost:5000/Category',postData)
    .then((response)=>{
      console.log('post request successful:',response.data);
      setCategoryName(''); 
      fetchCategory();
    })
    .catch((error)=>{
      console.error('error sending POST request:',error);
    });
  }
  else{
    axios.put(`http://localhost:5000/Category/${singleCategory}`, postData)
  .then((response) => {
    console.log("Updated successfully", response);
    setCategoryName("");
    fetchCategory();
    setSingleCategory(null)
  })
  .catch((error) => {
    console.error("Error updating category data:", error);
  });
  }
}

const fetchCategory = () => {
  axios.get('http://localhost:5000/Category').then((response)=>{
  console.log(response.data.categorys);
  setCategoryData(response.data.categorys)
  })
 . catch((error)=>{
    console.error('Error fetching Category data:', error);
  })
}

const handleFetchSingleCat = (id) => {
  axios.get(`http://localhost:5000/Category/${id}`).then((response)=>{
    const data = response.data.categorys
    setSingleCategory(data._id)
    setCategoryName(data.categoryname)
    })
   . catch((error)=>{
      console.error('Error fetching Category data:', error);
    })
}


useEffect(()=>{
  fetchCategory()
},[])



const handleDelete = (Id) => {
  axios.delete(`http://localhost:5000/Category/${Id}`)
  .then((response) => {
    console.log('Deleted successfully', response);
    fetchCategory();
  })
  . catch((error)=>{
    console.error('Error fetching category data:', error);
  })
} 








  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 250,
          width: 450,
          justifyContent: "center",
          px: 5,
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ m: 4 }}>
          Stream
        </Typography>
          <TextField id="standard-basic" label="Stream" variant="standard"             
            onChange={(event)=>setCategoryName(event.target.value)}
            value={categoryName}
          />
          <Button variant="contained" type="submit">Save</Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m:4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Sl No</TableCell>
              <TableCell align="center">Categary Name</TableCell>
              <TableCell align="right">Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData.map((category, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               < TableCell>{key+1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {category.categoryname}
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleDelete(category._id) }>Delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() =>handleFetchSingleCat(category._id) }>Edit</Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
            
};
export default Category;

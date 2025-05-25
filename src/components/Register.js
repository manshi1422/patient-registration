
import Box from "@mui/material/Box";
import { useState,useEffect } from "react"
import { Save } from "@mui/icons-material"
import { usePGlite } from "@electric-sql/pglite-react";
import { useLiveIncrementalQuery } from "@electric-sql/pglite-react";
import {  TextField, Button, Grid, CircularProgress, Typography } from "@mui/material"
const Register = () => {
  useEffect(() => {
   
    const channel = new BroadcastChannel("patient-db-sync");
   

    return () => channel.close();
  }, []);
  const broadcastUpdate = () => {
    const channel = new BroadcastChannel("patient-db-sync");
    channel.postMessage("update");
    channel.close();
  };
     const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    address: "",
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
   const items = useLiveIncrementalQuery(`
    SELECT *
    FROM patients;
  `,)
   const db = usePGlite();
  const handleSubmit =(e)=>{
    e.preventDefault();
    setIsSubmitting(true);
      db.query('INSERT INTO patients (id,name,age, gender,address,phone) VALUES ($6,$1,$2,$3,$4,$5);', [`${formData.name}`, `${formData.age}`,`${formData.gender}`,`${formData.address}`,`${formData.phone}`,`${items?.rows?.length+1}`]
    );
    setIsSubmitting(false);
      broadcastUpdate();
    setFormData({
    name: "",
    age: "",
    phone: "",
    gender: "",
    address: "",
  })
  }
  
  return (
    <div>
      <h3>Register New Patient</h3>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
           <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Age"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
         
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
             <TextField
              fullWidth
              label="Gender"
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              variant="outlined"
            />
          </Grid>
         
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              variant="outlined"
            />
         
         
         
        </Grid>
            <Button
              onClick={(e)=>handleSubmit(e)}
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? <CircularProgress size={20} /> : <Save />
              }
              style={{ width: "25%",marginTop:"20px" }}
            >
              {isSubmitting ? "Registering Patient..." : "Register Patient"}
            </Button>
          
      </Box>
    </div>
  );
};

export default Register;

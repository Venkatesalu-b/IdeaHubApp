import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import useSignUp from "./useSignUp";
const SignUp = () => {
   
   const {signUp,handleChange,handleSubmit} = useSignUp()
    return (
                <div>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="userName"
                        value={signUp.userName}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="userEmail"
                        type="email"
                        value={signUp.userEmail}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="userPassword"
                        type="password"
                        value={signUp.userPassword}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                </form>
                </div>
    );
};

export default SignUp;

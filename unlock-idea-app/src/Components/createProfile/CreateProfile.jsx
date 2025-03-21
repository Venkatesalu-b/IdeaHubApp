import React, { useState } from "react";
import useCreateProfile from "../createProfile/useCreateProfile"
import { TextField, FormControlLabel, FormControl, Checkbox, Button } from "@mui/material";
import './createProfile.css'

const CreateProfile = () => {
    const { allProfile, profileDetails, handleChange, handleSubmit } = useCreateProfile();
    return (
        <>
            <div>
                createProfile
            </div>
            <div className="ConnectForm">
                <div className="formcontainer">
                    <TextField
                        size="small"
                        value={profileDetails?.userName}
                        onChange={handleChange}
                        name="userName"
                        label="User Name"
                    />
                    <TextField
                        size="small"
                        value={profileDetails?.userProfile}
                        onChange={handleChange}
                        name="userProfile"
                        label="User Profile"
                    />
                    <TextField
                        size="small"
                        value={profileDetails?.userEmail}
                        onChange={handleChange}
                        name="userEmail"
                        label="Email"
                    />
                    <TextField
                        size="small"
                        value={profileDetails?.userMobileNo}
                        onChange={handleChange}
                        name="userMobileNo"
                        label="Mobile No"
                    />
                    <Button variant="contained" className="submitbutton" onClick={() => handleSubmit()}>Submit</Button>
                </div>
            </div>
        </>
    )
}
export default CreateProfile;
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";

const FollowersFile = ({ handleClose }) => {
    return (
        <div style={{ position: "relative", padding: "5px" }}>
            <IconButton 
                onClick={handleClose} 
                style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px" 
                }}
            >
                <CloseIcon />
            </IconButton>

            <div>
                <Typography style={{color:"blueviolet"}} >Followers </Typography>
            </div>
        </div>
    );
};

export default FollowersFile;

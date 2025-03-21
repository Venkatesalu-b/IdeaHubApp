import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from "@mui/material";
import useRequestCreation from "./useRequestCreation";

const RequestCreation = ({ handleClose, selectedUser, requestData, acceptRequest }) => {
    // console.log(selectedUser, "requestuserr", requestData);

    const { handleJoin,handleAcceptRequest } = useRequestCreation()
   
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
                <Typography style={{ color: "blueviolet" }} > Request Creation</Typography>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <h3>{selectedUser?.userName}</h3>
                    {acceptRequest?.length > 0 && (
                        <Button variant="contained" onClick={()=>handleAcceptRequest(selectedUser)}>Accept Request</Button>
                    )}
                    {requestData[0]?.connect_status === "requested" ? (
                        <Button variant="contained" disabled>Requested</Button>
                    ) : (
                        <Button variant="contained" onClick={() => handleJoin(selectedUser)}>
                            Connect
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RequestCreation;

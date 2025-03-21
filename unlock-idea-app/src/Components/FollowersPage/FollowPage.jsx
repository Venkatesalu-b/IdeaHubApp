import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import "./FollowPage.css"; // Importing CSS file
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RequestFile from "../RequestFolder/RequsetFile";
import FollowingFile from "../FollowingFolder/FollowingFile";
import FollowersFile from "../FollowersFolder/FollowersFile";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    p: 4,
};

const FollowPage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(null); // State to track which modal is open

    const handleBack = () => {
        navigate('/home/Connect');
    };

    const handleOpen = (modalType) => {
        setOpenModal(modalType); // Set which modal to open
    };

    const handleClose = () => {
        setOpenModal(null); // Close modal
    };

    return (
        <>
            <div className="back-button" onClick={handleBack}>
                <ArrowBackIcon />
            </div>

            {/* Three Clickable Divs */}
            <div className="follow-container">
                <div className="follow-box" onClick={() => handleOpen("request")}>Request</div>
                <div className="follow-box" onClick={() => handleOpen("following")}>Following</div>
                <div className="follow-box" onClick={() => handleOpen("followers")}>Followers</div>
            </div>

            {/* Modal for Requests */}
            <Modal
                open={openModal === "request"}
                onClose={handleClose}
                aria-labelledby="request-modal-title"
            >
                <Box sx={style}>
                    <RequestFile handleClose={handleClose} />
                </Box>
            </Modal>

            {/* Modal for Following */}
            <Modal
                open={openModal === "following"}
                onClose={handleClose}
                aria-labelledby="following-modal-title"
            >
                <Box sx={style}>
                    <FollowingFile handleClose={handleClose} />
                </Box>
            </Modal>

            {/* Modal for Followers */}
            <Modal
                open={openModal === "followers"}
                onClose={handleClose}
                aria-labelledby="followers-modal-title"
            >
                <Box sx={style}>
                    <FollowersFile handleClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
};

export default FollowPage;

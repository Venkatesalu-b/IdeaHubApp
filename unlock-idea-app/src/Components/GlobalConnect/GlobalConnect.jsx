import React from "react";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChatPage from "../chatPage/ChatPage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./GlobalConnect.css";
import useGlobalConnect from "./useGlobalConnect";
import RequestCreation from "../RequestCreation/RequestCreation";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    p: 4,
};

const GlobalConnect = () => {
    const { loginContextData, allUserProfiles } = useSelectedRoleData();
    const { chatModal, selectedUser, handleChatModal, handleClose, handleFollowersPage, requestModal, requestData,acceptRequest
    } = useGlobalConnect();
    // const [chatModal, setChatModal] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const navigate = useNavigate();

    // const handleChatModal = (user) => {
    //     setSelectedUser(user);
    //     setChatModal(true);
    // };

    // const handleClose = () => {
    //     setChatModal(false);
    //     setSelectedUser(null);
    // };

    // const handleFollowersPage = () => {
    //     navigate("/home/Followers");
    // };

    return (
        <>
            <div className="userProfileheader">
                <div>
                    <h3>{loginContextData[0]?.userName}</h3>
                    <p style={{ color: "GrayText" }}>{loginContextData[0]?.userProfile}</p>
                </div>
                <div>
                    <Button variant="contained" onClick={handleFollowersPage}>
                        Followers List
                    </Button>
                </div>
            </div>
            <div>
                <div>All Profiles</div>
                <div>
                    {allUserProfiles?.map((li) => (
                        <div key={li.id} className="profileItem" onClick={() => handleChatModal(li)}>
                            <h3>{li.userName}</h3>
                            <AddCircleOutlineIcon style={{ cursor: "pointer", marginLeft: "10px", color: "#3653ce" }} />
                        </div>
                    ))}
                </div>
            </div>
            <Modal open={chatModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    {requestData?.length > 0 && requestData !== null && requestData[0]?.connect_status === "Connected" ?
                        <ChatPage selectedUser={selectedUser} />
                        : <RequestCreation selectedUser={selectedUser} requestData={requestData} acceptRequest={acceptRequest} />

                    }
                </Box>
            </Modal>
            {/* <Modal open={requestModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <RequestCreation selectedUser={selectedUser} requestData={requestData} />
                </Box>
            </Modal> */}
        </>
    );
};

export default GlobalConnect;

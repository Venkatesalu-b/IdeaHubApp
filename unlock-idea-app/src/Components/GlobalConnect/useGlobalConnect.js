import React, { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../URL/url";
import { useNavigate } from "react-router-dom";


const useGlobalConnect = () => {
    const ApiUrl = APIURL;
    const [chatModal, setChatModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [requestModal, setRequestModal] = useState(false);
    const [requestData, setRequestData] = useState([]);
    const [acceptRequest, setAcceptRequest] = useState([]);
    const navigate = useNavigate();

    const handleChatModal = (user) => {

        setSelectedUser(user);
        setChatModal(true);

    };

    const handleClose = () => {
        setChatModal(false);
        setRequestModal(false);
        setSelectedUser(null);
    };

    const handleFollowersPage = () => {
        navigate("/home/Followers");
    };



    useEffect(() => {
        const fetchData = async () => {
            const loginUserName = localStorage.getItem("userLoginName");
            if (selectedUser?.userName) {
                try {
                    const response = await axios.get(`${ApiUrl}/getRequestStatus`, {
                        params: { userName: selectedUser.userName ,loginUser:loginUserName}
                    });
                    console.log(response.data, "requestt");
                    setRequestData(response.data.data);
                } catch (err) {
                    console.error("Error fetching request status:", err);
                }
            }
        };

        fetchData();
    }, [ApiUrl, selectedUser]);

    useEffect(() => {
        const fetchData = async () => {
            const loginUserName = localStorage.getItem("userLoginName");
                try {
                    const response = await axios.get(`${ApiUrl}/requestReceiver`, {
                        params: {  userName: loginUserName,friend_name:selectedUser?.userName }
                    });
                    console.log(response.data, "requestreceiver");
                    setAcceptRequest(response.data);
                }
                catch (error) {
                    console.log(error, "error");

                }
        }
        fetchData()
    }, [ApiUrl, selectedUser])

    return {
        chatModal, selectedUser, handleChatModal, handleClose, handleFollowersPage, requestModal, requestData,
        acceptRequest
    }
}
export default useGlobalConnect;
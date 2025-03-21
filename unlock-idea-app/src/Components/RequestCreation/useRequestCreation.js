import React, { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../URL/url";
import dayjs from "dayjs";

const useRequestCreation = () => {
    const userName = localStorage.getItem("userLoginName")
    const apiUrl = APIURL;
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getUserLoginProfileDetails`, {
                    params: { userName }
                });

                console.log(response.data, "userProfileData");
                setUserProfile(response.data)
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (userName) {
            fetchData();
        }
    }, [apiUrl, userName]);

    const handleJoin = async (selectedUser) => {
        try {
            console.log("join", userProfile, "join", selectedUser);

            const todayDate = dayjs().format("YYYY-MM-DD");

            const response = await axios.post(`${apiUrl}/sendRequestAPI`, {
                userName: userProfile?.userName,
                userEmail: userProfile?.userEmail,
                userProfile: userProfile?.userProfile,
                connect_status: "requested",
                request_date: todayDate,
                friend_name: selectedUser?.userName,
                friend_profile: selectedUser?.userProfile,
                friend_email: selectedUser?.userEmail 
            });

            console.log("Request Sent:", response.data);
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };


    const handleAcceptRequest = async (selectedUser) => {
        console.log(selectedUser, userName, "accept request");

        const todayDate = dayjs().format("YYYY-MM-DD");

        try {
            const response = await axios.post(`${apiUrl}/acceptRequestAPI`, {
                acceptUser: userName,
                requestUser: selectedUser?.userName,
                connectDate: todayDate,
                acceptDate: todayDate,
                connectStatus: "Connected"
            });

            console.log("Response:", response.data);
            alert("Request accepted successfully!");
        } catch (error) {
            console.error("Error accepting request:", error);
            alert("Failed to accept request. Please try again.");
        }
    };

    return {
        handleJoin, handleAcceptRequest
    }
}
export default useRequestCreation;
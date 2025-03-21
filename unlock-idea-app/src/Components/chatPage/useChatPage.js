import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { APIURL } from "../URL/url";

const useChatPage = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [userMessage, setUserMessage] = useState([]);
    const [senderMessage, setSenderMessage] = useState([]);
    const [selectUser, setSelectUser] = useState(""); // Correct variable name
    const loginUserName = localStorage.getItem("userLoginName");
    const apiUrl = APIURL;

    const handleSend = async (selectedUser) => {
        console.log(selectedUser, "selecteduserkkkkkkk", loginUserName);
        setSelectUser(selectedUser?.userName); // Set selected user

        const todayDate = dayjs().format("YYYY-MM-DD");
        const timestamp = dayjs().toISOString();  // Get ISO 8601 format with milliseconds

        try {
            const response = await axios.post(`${apiUrl}/chat/send`, {
                userName: loginUserName,
                message: inputMessage,
                messageDate: todayDate,
                messageTime: timestamp,
                senderName: selectedUser?.userName
            });

            console.log("Message sent successfully:", response.data);
            setInputMessage(""); // Reset the input message after sending
        } catch (error) {
            console.error("Error sending message:", error.response ? error.response.data : error.message);
        }
    };

    // Fetch messages when the selected user changes
    const messageData = useMemo(() => {
        if (!selectUser) return; // If no user is selected, do not fetch messages

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${apiUrl}/chat/history/${loginUserName}/${selectUser}/${loginUserName}/${selectUser}`);
                console.log("Messages fetched:", response.data);

                setUserMessage(response.data.user1Messages); 
                setSenderMessage(response.data.user2Messages); 
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        fetchMessages(); // Trigger fetch when selectUser changes
    }, [loginUserName, selectUser,inputMessage]); // Re-fetch when selectUser changes

    return {
        inputMessage,
        setInputMessage,
        handleSend,
        messageData,
        userMessage,
        senderMessage,
        selectUser,
        setSelectUser
    };
};

export default useChatPage;

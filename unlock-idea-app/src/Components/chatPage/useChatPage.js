import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { APIURL } from "../URL/url";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:7000";

const useChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [senderMessage, setSenderMessage] = useState([]);
  const [selectUser, setSelectUser] = useState("");
  const loginUserName = localStorage.getItem("userLoginName");
  const apiUrl = APIURL;

  const socketRef = useRef();

  // Initialize socket connection once
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // Listen for incoming messages
    socketRef.current.on("receiveMessage", (data) => {
      console.log("Socket message received:", data);

      if (
        (data.userName === loginUserName && data.senderName === selectUser) ||
        (data.userName === selectUser && data.senderName === loginUserName)
      ) {
        // Refresh message list when new message arrives
        fetchMessages();
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [loginUserName, selectUser]);

  const handleSend = async (selectedUser) => {
    setSelectUser(selectedUser?.userName);

    const todayDate = dayjs().format("YYYY-MM-DD");
    const timestamp = dayjs().toISOString();

    const messagePayload = {
      userName: loginUserName,
      message: inputMessage,
      messageDate: todayDate,
      messageTime: timestamp,
      senderName: selectedUser?.userName,
    };

    try {
      await axios.post(`${apiUrl}/chat/send`, messagePayload);
      socketRef.current.emit("sendMessage", messagePayload); // Emit over websocket
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
    }
  };

  // Fetch messages between selected users
  const fetchMessages = async () => {
    if (!selectUser) return;

    try {
      const response = await axios.get(
        `${apiUrl}/chat/history/${loginUserName}/${selectUser}/${loginUserName}/${selectUser}`
      );

      setUserMessage(response.data.user1Messages);
      setSenderMessage(response.data.user2Messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectUser]);

  return {
    inputMessage,
    setInputMessage,
    handleSend,
    userMessage,
    senderMessage,
    selectUser,
    setSelectUser,
  };
};

export default useChatPage;

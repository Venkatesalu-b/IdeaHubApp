import React, { useEffect, useRef } from "react";
import useChatPage from "./useChatPage";
import SendIcon from '@mui/icons-material/Send';

const ChatPage = ({ selectedUser }) => {
    const { inputMessage, setInputMessage, handleSend, userMessage, senderMessage, setSelectUser } = useChatPage();

    const combinedMessages = [
        ...userMessage.map(msg => ({ ...msg, isUser: true })),
        ...senderMessage.map(msg => ({ ...msg, isUser: false }))
    ];
    const sortedMessages = combinedMessages.sort((a, b) => b.messageTime.localeCompare(a.messageTime)).reverse();

    const messageContainerRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            setSelectUser(selectedUser?.userName);
        }
    }, [selectedUser, setSelectUser]);

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, [senderMessage]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative"
        }}>
            <div>
                <h3>Chat Page</h3>
                <h5>{selectedUser?.userName}</h5>
            </div>

            <div
                ref={messageContainerRef}
                style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "40px",
                    marginBottom: "10px",
                    maxHeight: "calc(100% - 100px)" // Ensures the chat area takes up all space except for the input area
                }}
            >
                {/* Display combined messages */}
                {sortedMessages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: msg.isUser ? "flex-end" : "flex-start", // Right for user, Left for sender
                            marginBottom: "10px",
                            padding: "10px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.isUser ? "#007bff" : "#f1f1f1", // Blue for user, light gray for sender
                                color: msg.isUser ? "white" : "black",
                                padding: "10px",
                                borderRadius: "10px",
                                maxWidth: "60%",
                                wordWrap: "break-word"
                            }}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Bar at Bottom */}
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderTop: "1px solid #ccc",
                background: "#fff",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%"
            }}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flexGrow: 1,
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />
                <button
                    onClick={() => handleSend(selectedUser)}
                    style={{
                        marginLeft: "8px",
                        padding: "8px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatPage;

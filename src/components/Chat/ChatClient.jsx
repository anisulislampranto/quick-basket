import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL); // Replace with your backend URL

    useEffect(() => {
        socket.emit("joinRoom", { chatId });

        socket.on("newMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [chatId]);

    const sendMessage = () => {
        socket.emit("sendMessage", { chatId, sender: "currentUserId", message: newMessage });
        setNewMessage("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg.message}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;

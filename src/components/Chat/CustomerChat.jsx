import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const CustomerChat = ({ shopId, customerId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chatId, setChatId] = useState("");

    console.log('shopId', shopId);
    console.log('customerId', customerId);


    const initiateChat = async () => {

        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shopId, customerId }),
            });
            console.log('clicked');

            const data = await response.json();

            console.log('data', data);

            setChatId(data.chat._id);

            socket.emit("joinChat", { chatId: data.chat._id });

            const messagesResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${data.chat._id}`);

            const messagesData = await messagesResponse.json();

            setMessages(messagesData.messages || []);
        } catch (error) {
            console.error("Failed to fetch chat:", error);
        }
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("sendMessage", { chatId, sender: customerId, message });
        setMessage(""); // Clear input field after sending
    };

    useEffect(() => {
        if (!chatId) return;

        socket.on("newMessage", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
        socket.off("newMessage");
        };
    }, [chatId]);

    return (
        <div>
            <button onClick={initiateChat}>Initiate chat</button>

            <h2>Chat with Shop</h2>
            <div style={{ height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.sender === customerId ? "You" : "Shop"}:</strong> {msg.message}
                </div>
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default CustomerChat;

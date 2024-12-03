import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const CustomerChat = ({ productId, shopId, customerId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shopId, customerId }),
        });
        const data = await response.json();
        console.log('data', data);
        
        setChatId(data.chat._id);
        socket.emit("joinChat", { chatId: data.chat._id });

        const messagesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${data.chat._id}`
        );
        const messagesData = await messagesResponse.json();

        console.log('messagesData', messagesData);

        setMessages(messagesData.messages || []);
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
    };

    fetchChat();
  }, [shopId, customerId]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: customerId, message }),
      });

      socket.emit("sendMessage", { chatId, sender: customerId, message });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log('messages', messages);
  

  return (
    <div>
      <h2>Chat with Shop</h2>
      <div style={{ height: "300px", overflowY: "scroll" }}>
        {messages?.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender?._id === customerId ? "You" : "Shop"}:</strong> {msg.message}
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

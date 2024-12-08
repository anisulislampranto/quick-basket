import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const ShopChat = ({ shopId }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/shop/${shopId}`);
            const data = await response.json();
            
            setChats(data.chats);
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        }
    };

    fetchChats();
  }, [shopId]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}`);
      const data = await response.json();
      setMessages(data.messages || []);
      setSelectedChatId(chatId);

      socket.emit("joinChat", { chatId });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedChatId) return;

    socket.emit("sendMessage", { chatId: selectedChatId, sender: shopId, message });
    setMessage("");
  };

  useEffect(() => {
    if (!selectedChatId) return;

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChatId]);

  return (
    <div className=" flex">
      <div className=" flex flex-col border gap-5">
        <h3>Chats</h3>
        {chats.map((chat) => (
          <button key={chat._id} onClick={() => fetchMessages(chat._id)}>
            Chat with {chat.customer.name}
          </button>
        ))}
      </div>
      <div>
        <h3>Messages</h3>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender === shopId ? "You" : "Customer"}:</strong> {msg.message}
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
    </div>
  );
};

export default ShopChat;

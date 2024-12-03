import { useEffect, useState } from "react";

const ShopChat = ({ shopId }) => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      const fetchChats = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/shop/${shopId}`);
          const data = await response.json();
          setChats(data.chats || []);
        } catch (error) {
          console.error("Failed to fetch chats:", error);
        }
      };
  
      fetchChats();
    }, [shopId]);
  
    const sendMessage = async (chatId) => {
      if (!message.trim()) return;

      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: shopId, message }),
        });

        const data = await res.json()

        console.log('data', data);
        
  
        socket.emit("sendMessage", { chatId, sender: shopId, message });
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
  
    return (
      <div>
        <h2>Customer Messages</h2>
        <div className=" flex flex-col">
          {chats.map((chat) => (
            <button key={chat._id} onClick={() => setSelectedChat(chat._id)}>
              Chat with {chat.customer.name}
            </button>
          ))}
        </div>
        {selectedChat && (
          <div>
            <h3>Messages</h3>
            <div style={{ height: "300px", overflowY: "scroll" }}>
              {chats
                .find((chat) => chat._id === selectedChat)
                .messages.map((msg, index) => (
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
            <button onClick={() => sendMessage(selectedChat)}>Send</button>
          </div>
        )}
      </div>
    );
  };
  
  export default ShopChat;
  
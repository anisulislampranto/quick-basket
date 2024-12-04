import { useEffect, useState } from "react";
import io from "socket.io-client";


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

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
    }, []);

    const sendMessage = async (chatId) => {
      if (!message.trim()) return;

      try {
        // const res  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}/message`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ sender: shopId, message }),
        // });

        // const data = await res.json()

        // console.log('data', data);

        socket.emit("sendMessage", { chatId, sender: shopId, message });
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

    console.log('chats', chats);

    return (
        <div>
            <div className=" flex gap-3">
                <div className=" flex flex-col bg-gray-300">
                    {chats.map((chat) => (
                        <button className={` p-2 border ${chat._id === selectedChat ? 'bg-white  border-black' : ' border-transparent' }`} key={chat._id} onClick={() => setSelectedChat(chat._id)}>
                            {chat.customer.name}
                        </button>
                    ))}
                </div>
                {selectedChat && (
                <div>
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
        </div>
    );
};

export default ShopChat;

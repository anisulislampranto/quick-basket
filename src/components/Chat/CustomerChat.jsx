'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CiChat1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";



const CustomerChat = ({ product, user }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to socket.io
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const initiateChat = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: user._id, shopId: product.shop._id }),
    });
    const data = await res.json();
    console.log('data', data);
    
    setChat(data.chat);

    // Join chat room
    socket.emit("joinRoom", { chatId: data.chat._id });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        chatId: chat._id,
        sender: user._id,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      {/* Product details */}
        <button className=" fixed z-50 bg-white bottom-5 right-20 border-2 border-black flex items-center gap-3 p-3" onClick={initiateChat}>
            {
                chat ? <RxCross2 onClick={() => setChat(!chat)} /> : <>Chat with Shop <CiChat1 className=" text-green-800 text-3xl" /></>
            }
        </button>
        <div
            className={`transition-all duration-700 ease-out ${
            chat ? "opacity-100 translate-y-0 z-50" : "opacity-0 translate-y-20"
            } fixed bottom-20 right-20 w-80 bg-white border-2 border-black p-4 shadow-lg`}
        >
          <div className="overflow-y-auto max-h-60">
            {messages.map((msg, idx) => (
                <p key={idx}>{msg.message}</p>
            ))}
            </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
    </div>
  );
};

export default CustomerChat;

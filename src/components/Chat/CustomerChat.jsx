import { useState, useEffect } from "react";
import io from "socket.io-client";
import { RxCross2 } from "react-icons/rx";


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const CustomerChat = ({ productId, shopId, customerId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [reload, setReload] = useState('');
  const [chat, setChat] = useState(false)

  const initiateChat = async() => {
    setChat(true)
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

        setMessages(messagesData.messages || []);
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
  }

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
    //   await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}/message`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ sender: customerId, message }),
    //   });

      socket.emit("sendMessage", { chatId, sender: customerId, message });
      setMessage("");
      setReload(reload + 1)
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
        console.log('New Message Customer', data);
        setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setMessages, messages]);

  console.log('messages', messages);

  return (
    <div>

        <div className=" cursor-pointer border-2 border-black p-3 bg-white z-40 fixed bottom-10 right-5">
            {
                chat ? <RxCross2 onClick={() => setChat(!chat)} /> : 
                <button onClick={initiateChat}>Chat with Shop</button>
            }
        </div>

        {
            chat &&
            <div className={" z-50 fixed bottom-28 right-10 bg-white border border-black p-10"}>
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
        }
      
    </div>
  );
};

export default CustomerChat;

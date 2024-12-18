import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const ShopChat = ({ shopId }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const lastMessageRef = useRef();

  console.log('messages', messages);


  useEffect(() => {
    (async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/shop/${shopId}`);
            const data = await response.json();
        
            setChats(data.chats);
        
        } catch (error) {
            console.error("`Failed` to fetch chats:", error);
        }
    })()

  }, [shopId]);

  const fetchMessages = async (chatId) => {
    setActiveChatId(chatId)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}`);
      const data = await response.json();

      console.log('dataObject', data);
      

      setMessages(data.messages || []);
      setSelectedChatId(chatId);

      socket.emit("joinChat", { chatId });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedChatId) return;
    if (!shopId) return;

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

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  console.log('messages', messages);


  return (
    <div className=" flex">
      <div className="flex flex-col border-2 border-black bg-black">
        {chats.map((chat) => (
          <button className={`p-2 ${chat._id === activeChatId ? ' bg-white' : 'text-white' }`} key={chat._id} onClick={() => fetchMessages(chat._id)}>
              {chat.customer.name}
          </button>
        ))}
      </div>

      <div className=" border-2 border-black border-l-0 p-2">

        <Messages messages={messages} userId={shopId} lastMessageRef={lastMessageRef}  />

        <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ShopChat;

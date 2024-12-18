import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { CiChat1 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import MessageInput from "./MessageInput";
import Messages from "./Messages";



const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const CustomerChat = ({ shop, customerId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chatId, setChatId] = useState("");
    const [openChat, seOpenChat] = useState(false);
    const lastMessageRef = useRef();

    const initiateChat = async () => {
        seOpenChat(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shopId: shop._id, customerId }),
            });

            const data = await response.json();

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
        setMessage("");
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

    useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

    


    return (
        <div>
            <div className=" cursor-pointer z-50 bg-white border-black fixed bottom-6 right-5 flex items-center gap-5 border-2 p-2" > 
                {
                    openChat ? <IoCloseOutline className=" w-6 h-6"  onClick={()=> seOpenChat(false)} /> : <CiChat1 className=" w-6 h-6" onClick={initiateChat} /> 
                }
            </div>
            
            <div className={`bg-white p-5 border-2 border-black fixed bottom-20 right-5 transition-all duration-500 ease-in-out ${openChat ? ' opacity-100 z-50': 'opacity-0 z-30'}`}>
                
                <h2 className=" border-2 border-black p-2 ">Chat with <strong>{shop.name}</strong> </h2>
                
                <Messages messages={messages} userId={customerId} lastMessageRef={lastMessageRef}  />

                <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>

        </div>
    );
};

export default CustomerChat;

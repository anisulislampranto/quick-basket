import React from 'react'

export default function Messages({messages, userId, lastMessageRef}) {

    console.log(
        'messages',messages
    );
    

    return (
        <ul className="h-[300px] overflow-y-scroll space-y-1 py-3">
            {messages?.map((msg, index) => {
                const sender = msg?.sender?._id || msg?.sender;

                return(
                    <li ref={lastMessageRef} key={index} className={`flex text-white ${sender === userId ? "justify-end" : "justify-start"}`}>
                        <strong className={`p-2 rounded-lg ${sender === userId ? " border-2 border-black text-black" : " bg-gray-800"}`} >{msg.message}</strong> 
                    </li>
                )
            })}
        </ul>
    )
}



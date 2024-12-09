import React from 'react'

export default function Messages({messages, userId, lastMessageRef}) {

    return (
        <ul className="h-[300px] overflow-y-scroll space-y-1 py-3">
            {messages?.map((msg, index) => (
                <li ref={lastMessageRef} key={index} className={`flex text-white ${msg.sender?._id || msg.sender === userId ? "justify-end" : "justify-start"}`}>
                    {console.log('msg', msg)}
                    <strong className={`p-2 rounded-lg ${ msg.sender || msg.sender?._id === userId ? " border-2 border-black text-black" : " bg-gray-800"}`} >{msg.message}</strong> 
                </li>
            ))}
        </ul>
    )
}

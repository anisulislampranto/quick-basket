import React from 'react'
import { BsSend } from 'react-icons/bs'

export default function MessageInput({message, setMessage, sendMessage}) {
    return (
        <div className=" flex items-center w-full">
            <input
                className=" border-2 p-2 border-black border-r-0 focus:outline-0 w-[90%]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage} className=" hover:text-white hover:bg-black text-black border-2 p-2 border-black hover:border-black"><BsSend className=" w-6 h-6" /></button>
        </div>
    )
}

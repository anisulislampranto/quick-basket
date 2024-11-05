import React from 'react'

export default function AnimatedBg({children}) {
    return (
        <div className="relative inline-block px-4 py-2 font-medium">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black "></span>
            <span className="relative text-black ">{children}</span>
        </div>
    )
}



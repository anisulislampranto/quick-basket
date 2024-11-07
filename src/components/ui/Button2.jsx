import React from 'react'


export default function Button2({text, type, onClick}) {
  return (
    <button onClick={onClick} type={type} className=" group border-2 bg-black cursor-pointer px-3 py-1 font-semibold transition-all duration-200 hover:bg-[#e2e4e6]">
        <span className="flex justify-center items-center text-white group-hover:text-black">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
            </svg>
            {text}
        </span>
    </button>
  )
}

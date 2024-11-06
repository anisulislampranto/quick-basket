import React from "react";
import Image from "next/image";
import logo from '../assets/quick-basket.png'


export default function Loader () {
  return (
    <div className="flex items-center justify-center h-screen">

      <div className=" flex flex-col gap-3 items-center">
          <Image
            src={logo} 
            alt="Loading..."
            width={200}
            height={200}
            className="animate-pulse"
          />

        <div className="loader"></div>
      </div>
    </div>
  );
};

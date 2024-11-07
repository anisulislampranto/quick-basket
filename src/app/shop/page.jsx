'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import AddProductClient from '@/components/AddProduct/AddProduct';
import AddShopClient from '@/components/AddShop/AddShop';


export default function ShopClient() {
    const {user} = useSelector((state) => state.user);

    return (
        <>
            {
                (user?.type === 'seller' && !user?.shop) ? 
                <div className=' flex items-center justify-center w-screen h-[95vh] py-10 p-5'>
                    <AddShopClient />
                </div> 
                : (user.email && user.shop) &&
                <div className=' flex flex-col container mx-auto relative'>
                    <div className=' relative h-44 sm:h-64 md:h-72 lg:h-96 w-full'>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black "></span>
                        <Image className=' absolute object-cover' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.coverImage}`} alt='ShopImage' fill />
                    </div>
                    <div className=' ml-6 absolute bottom-20 md:bottom-28 h-28 w-28 md:h-44 md:w-44 border-4 border-white backdrop-blur-md'>
                        <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.logo}`} alt='ShopImage' fill />
                    </div>

                    <div className=' flex justify-between items-center'>
                        <div className=' flex flex-col gap-1 mt-2 px-5'>
                            <h1 className=' text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{user?.shop?.name}</h1>
                            <p>{user?.shop?.description}</p>
                        </div>

                        <div className=' flex items-end mt-5 md:mt-0'>
                            <AddProductClient />
                        </div>
                    </div>
                </div>
            }

            
        </>
    )
}

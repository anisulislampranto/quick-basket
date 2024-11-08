'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import AddProductClient from '@/components/AddProduct/AddProduct';
import AddShopClient from '@/components/AddShop/AddShop';
import { useRouter } from 'next/navigation';
import ShopProductsClient from '@/components/ShopProducts/ShopProductsClient';
import DropBorder from '@/components/ui/DropBorder';


export default function MyShopClient() {
    const {user, isLoading} = useSelector((state) => state.user);

    return (
        <>
            {
                (user?.type === 'seller' && !user?.shop) ? 
                <div className=' flex items-center justify-center w-screen h-[95vh] py-10 p-5'>
                    <AddShopClient />
                </div> 
                : (user?.email && user?.shop) &&
                <div className=' flex flex-col container mx-auto relative'>
                    <div className=' relative h-44 sm:h-64 md:h-72 lg:h-96 w-full'>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black "></span>
                        <Image className=' absolute object-cover' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.coverImage}`} alt='ShopImage' fill />
                    </div>

                    <div className=' ml-6 absolute bottom-20 md:bottom-28 flex flex-col md:flex-row backdrop-blur-md text-white border border-white max-w-[80%]'>
                        <div className=' h-28 w-28 md:h-44 md:w-80 relative'>
                            <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.logo}`} alt='ShopImage' fill />
                        </div>
                        <div className=' flex flex-col py-2 gap-5 mt-2 px-5 '>
                            <h1 className=' text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{user?.shop?.name}</h1>
                            <p>{user?.shop?.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus ab magni perspiciatis optio consequatur suscipit quo deleniti architecto nobis!</p>
                        </div>
                    </div>

                    <div className=' flex justify-end items-end'>
                        <div className=' flex items-end mt-5'>
                            <AddProductClient />
                        </div>
                    </div>

                    <div className=' absolute top-[19rem] sm:top-[22rem] md:top-[25rem] lg:top-[32rem]'>
                        <ShopProductsClient products={user?.shop?.products} />
                    </div>
                </div>
            }
        </>
    )
}

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import AddProductClient from '@/components/AddProduct/AddProduct';
import AddShopClient from '@/components/AddShop/AddShop';
import ShopProductsClient from '@/components/ShopProducts/ShopProductsClient';


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
                <>
                    <div className=' flex flex-col container mx-auto relative'>
                        <div className=' relative h-56 sm:h-64 md:h-72 lg:h-96 w-full'>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black "></span>
                            <Image className=' absolute object-cover' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.coverImage}`} alt='ShopImage' fill />
                        </div>

                        <div className=' ml-6 absolute bottom-20 md:bottom-28 flex flex-col md:gap-5 md:flex-row backdrop-blur-md text-white border border-white max-w-[80%] py-2'>
                            <div className=' left-5 h-14 w-14 md:h-40 md:w-80 relative'>
                                <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.shop?.logo}`} alt='ShopImage' fill />
                            </div>
                            <div className=' flex flex-col justify-center md:gap-2 pb-2 px-5 '>
                                <h1 className=' text-lg sm:text-3xl md:text-3xl lg:text-5xl font-bold'>{user?.shop?.name}</h1>
                                <p className='text-xs md:text-sm line-clamp-2'>{user?.shop?.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus ab magni perspiciatis optio consequatur suscipit quo deleniti architecto nobis!</p>
                            </div>
                        </div>

                        <div className=' flex justify-end items-end'>
                            <div className=' flex items-end mt-5'>
                                <AddProductClient />
                            </div>
                        </div>

                    </div>
                    <div className=' flex flex-col container mx-auto '>
                        <ShopProductsClient products={user?.shop?.products} />
                    </div>
                </>

            }
        </>
    )
}

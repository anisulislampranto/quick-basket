'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import AddProductClient from '@/components/AddProduct/AddProduct';
import AddShopClient from '@/components/AddShop/AddShop';
import { useRouter } from 'next/navigation';
import ShopProducts from '@/components/ShopProducts/ShopProductsClient';


export default function MyShopClient() {
    const [type, setType] = useState('products');
    const {user, isLoading} = useSelector((state) => state.user);
    const router = useRouter();
    const [shopOrders, setShopOrders] = useState([])
    const [fetchOrders, setFetchOrders] = useState(0)

    useEffect(() => {
        (async()=>{
            const token = localStorage.getItem('quickBasketToken')
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shop/${user.shop?._id}/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (res.ok) {
                    setShopOrders(data.orders)
                }

            } catch (error) {
                console.log(error);
            }
        })()
    }, [type, fetchOrders])

    useEffect(() => {
        if (!user || !user?.email) {
            router.push('/signup')
        }
        if (user && user?.email && user.type !== 'seller') {
            router.back()
        }
    }, [user])

    if (user && user?.email && user.type !== 'seller') {
       return <div className=' text-center mt-[20%]'>Only Seller Has the access to this page</div>
    }

    return (
        <>
            {
                (user?.type === 'seller' && !user?.shop) ? 
                <div className=' flex items-start justify-center w-screen h-full py-10 md:py-20 px-10'>
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

                        <div className=' ml-6 absolute bottom-20 md:bottom-28 flex flex-col md:gap-5 md:flex-row backdrop-blur-md backdrop-brightness-75 text-white border border-white max-w-[80%] py-2'>
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
                    <div className=' flex flex-col container mx-auto pb-20'>
                        <ShopProducts fetchOrders={fetchOrders} setFetchOrders={setFetchOrders} shopOrders={shopOrders} setType={setType} type={type} products={user?.shop?.products} />
                    </div>
                </>

            }
        </>
    )
}

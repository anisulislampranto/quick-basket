'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import AccordionWrapper from '../ui/AccordionWrapper';
import { useDispatch } from 'react-redux';
import { setCartProduct } from '@/lib/features/cart/cartSlice';
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { TbTruckDelivery } from "react-icons/tb";


export default function ProductDetailsClient({productDetails}) {
    const {user} = useSelector((state) => state.user)
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()

    return (
        <div className=' flex flex-col gap-5 container mx-auto py-10'>
            <div className=' flex gap-5 flex-col lg:flex-row px-5'>
                <div className=' flex flex-col items-center gap-5 w-full lg:w-[60%] mt-5'>
                    {/* Big Image */}
                    <div className=' relative h-96 w-[20rem] sm:w-[26rem] md:w-[29rem] '>
                        <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${ selectedImage ? selectedImage : productDetails.images?.[0]}`} alt='image' fill />
                    </div>
                    {/* Small images */}
                    <ul className=' flex gap-2'>
                        {
                            productDetails.images?.map((image) =>
                                <li onClick={() => setSelectedImage(image)} className={`relative h-20 w-20 border ${selectedImage === image && 'border-black'}`}>
                                    <Image className='absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`} alt='image' fill />
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className='lg:fixed lg:h-[33rem] w-full lg:w-[30%] lg:right-0 lg:top-[10rem] z-40 border-black bg-white lg:bottom-0 border-2 p-5 flex flex-col md:flex-row justify-center items-center lg:items-start lg:justify-start lg:flex-col gap-5'>
                    
                    <div>    
                        <p className=' capitalize'>{productDetails.category.split('&').join(' & ')}</p>
                        <h1 className=' text-4xl uppercase'>{productDetails.name}</h1>
                    </div>

                    <p>${productDetails.price}</p>
                    {
                        user.type === 'customer' &&
                        <>
                            <div className=' flex items-center gap-2'> 
                                <button className=' px-2 border hover:border-red-600 hover:text-red-600' onClick={() => setQuantity(quantity - 1)}>-</button> 
                                    {quantity} 
                                <button className=' px-2 border hover:border-green-600 hover:text-green-600' onClick={() => setQuantity(quantity + 1)}>+</button> 
                            </div>
                            <button className=' border border-black flex items-center p-2 gap-2 hover:bg-black hover:text-white w-40 justify-center' onClick={()=> dispatch(setCartProduct({product: productDetails, quantity}))}> <BsCartPlus /> Add to Cart</button>
                        </>
                    }

                    <div>
                        <div className=' flex items-center gap-2'>
                            <TbTruckDelivery className=' w-8 h-8' />
                            <p>Standard Delivery</p>
                        </div>
                        <p className=' text-sm text-gray-500'>Get withing 5-7 Days.</p>
                    </div>

                    <div>
                        <p className=' text-gray-600'>Sold By</p>
                        <div className=' relative h-20 w-20 border'>
                            <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${productDetails?.shop?.logo}`} alt='shopLogo' fill />
                        </div>
                        <p>{productDetails.shop.name}</p>
                    </div>
                    {
                        console.log( '${process.env.NEXT_PUBLIC_BACKEND_URL}/${productDetails?.shop?.logo}', `${process.env.NEXT_PUBLIC_BACKEND_URL}/${productDetails?.shop?.logo}`)
                    }

                    {
                        console.log( '${process.env.NEXT_PUBLIC_BACKEND_URL}/${productDetails.images?.[0]}', `${process.env.NEXT_PUBLIC_BACKEND_URL}/${productDetails.images?.[0]}`)
                    }

                </div>
            </div>

            <div className=' px-5 w-full lg:max-w-[70%]'>
                <AccordionWrapper title={'Description'}>
                        <p className=' text-black'>{productDetails.description}</p>
                </AccordionWrapper>
                <AccordionWrapper title={'Reviews'}>
                    <ul className='flex flex-col gap-5'>
                        {productDetails?.reviews?.map((el) => 
                            <li className=' flex flex-col gap-2'>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                    {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        style={{
                                        color: index < el?.rating ? 'gold' : 'gray',
                                        fontSize: '20px',
                                        marginRight: '2px',
                                        }}
                                    >
                                        ★
                                    </span>
                                    ))}
                                </div>
                                <p>{el.comment}</p>
                                <p>by <strong>{el.user.name}</strong></p>
                            </li>
                        )}
                    </ul>
                </AccordionWrapper>
            </div>
        </div>
    )
}

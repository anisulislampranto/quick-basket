'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import AccordionWrapper from '../ui/AccordionWrapper';
import { useDispatch } from 'react-redux';
import { setCartProduct } from '@/lib/features/cart/cartSlice';

export default function ProductDetailsClient({productDetails}) {
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

                <div className='lg:pt-20 lg:fixed lg:h-screen w-full lg:w-[30%] lg:right-0 lg:top-20 lg:bottom-0 border p-5'>
                    <p className=' capitalize'>{productDetails.category.split('&').join(' & ')}</p>
                    <h1 className=' text-4xl uppercase'>{productDetails.name}</h1>
                    <p>${productDetails.price}</p>
                    <div> <button onClick={() => setQuantity(quantity - 1)}>-</button> {quantity} <button onClick={() => setQuantity(quantity + 1)}>+</button> </div>

                    <button onClick={()=> dispatch(setCartProduct({product: productDetails, quantity}))}>Add to Cart</button>

                </div>
            </div>

            <div className=' px-5 w-full lg:max-w-[70%]'>
                <AccordionWrapper title={'Description'}>
                        <p className=' text-black'>{productDetails.description}</p>
                </AccordionWrapper>
                <AccordionWrapper title={'Reviews'}>
                        <p className=' text-black'>{productDetails.description}</p>
                </AccordionWrapper>
            </div>
        </div>
    )
}

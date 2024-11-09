'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import AccordionWrapper from '../ui/AccordionWrapper';

export default function ProductDetailsClient({productDetails}) {
    const [selectedImage, setSelectedImage] = useState(null)

    console.log('productDetails', productDetails);

    return (
        <div className=' flex flex-col gap-5 container mx-auto '>
            <div className=' flex gap-5'>
                <div className=' flex flex-col items-center gap-5 w-[60%]'>
                    {/* Big Image */}
                    <div className=' relative h-96 w-[29rem]'>
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

                <div>
                    <p>{productDetails.category}</p>
                    <h1>{productDetails.name}</h1>
                    <p>{productDetails.price}</p>
                </div>
            </div>
            <div className=' px-10'>
                <AccordionWrapper title={'Description'}>
                        <p className=' text-black'>{productDetails.description}</p>
                </AccordionWrapper>
            </div>
        </div>
    )
}

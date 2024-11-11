'use client';

import Products from '@/components/Products/Products';
import Loader2 from '@/utils/Loader2';
import React, { useEffect, useState } from 'react'

export default function ProductsClient() {
    const [products, setProducts] = useState([]);
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        (async()=>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data.products)
                    setFetching(false)
                }
            } catch (error) {
                console.log('error', error);
                setFetching(false)
            }
        })()
    }, [])

    return (
        <div className=' container mx-auto pb-20'>
            <h1 className=' text-5xl mt-10'>Products</h1>
            {
                fetching ? 
                <div className='flex items-end justify-center h-72'>        
                    <Loader2 />
                </div>
                : 
                <Products products={products} />
            }

        </div>
    )
}

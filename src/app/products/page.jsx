'use client';

import Products from '@/components/Products/Products';
import { placeholderCard } from '@/utils/PlaceholderCard';
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
                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>        
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                </div>
                : 
                <Products products={products} />
            }

        </div>
    )
}

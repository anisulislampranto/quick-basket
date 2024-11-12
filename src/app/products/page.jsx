'use client';

import Products from '@/components/Products/Products';
import Loader2 from '@/utils/Loader2';
import React, { useEffect, useState } from 'react';

export default function ProductsClient() {
    const [products, setProducts] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [name, setName] = useState(''); // State for name filter
    const [minPrice, setMinPrice] = useState(''); // State for minimum price filter
    const [maxPrice, setMaxPrice] = useState(''); // State for maximum price filter

    const fetchProducts = async () => {
        setFetching(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            );
            if (res.ok) {
                const data = await res.json();
                setProducts(data.products);
            }
        } catch (error) {
            console.log('error', error);
        }
        setFetching(false);
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on initial load and whenever filters change
    }, [name, minPrice, maxPrice]);

    return (
        <div className='container mx-auto pb-20'>
            <h1 className='text-5xl mt-10'>Products</h1>
            
            {/* Filters Section */}
            <div className='mt-5'>
                <div className=' flex flex-col'>
                    <label htmlFor='name' className='text-lg mr-2'>Search by Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter product name'
                        className=' focus:outline-none rounded-none border border-black  p-2 mr-4'
                    />
                </div>

                <div className=' flex flex-col'>
                    <label htmlFor='minPrice' className='text-lg mr-2'>Min Price:</label>
                    <input
                        type='number'
                        id='minPrice'
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder='Min'
                        className='focus:outline-none rounded-none border border-black p-2 mr-4'
                    />
                </div>

                <div className=' flex flex-col'>
                    <label htmlFor='maxPrice' className='text-lg mr-2'>Max Price:</label>
                    <input
                        type='number'
                        id='maxPrice'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder='Max'
                        className='focus:outline-none rounded-none border border-black p-2'
                    />
                </div>
            </div>

            {fetching ? 
                <div className='flex items-end justify-center h-72'>        
                    <Loader2 />
                </div>
                : 
                <Products products={products} />
            }
        </div>
    );
}

'use client';

import Products from '@/components/Products/Products';
import Loader2 from '@/utils/Loader2';
import React, { useEffect, useState } from 'react';

export default function ProductsClient() {
    const [products, setProducts] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState(''); 
    const [maxPrice, setMaxPrice] = useState('');

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
        fetchProducts();
    }, [name, minPrice, maxPrice]);

    console.log('products', products);
    

    return (
        <div className='container mx-auto pb-20 px-10'>
            <div className=' flex flex-col md:flex-row items-start justify-between mt-10'>
                <h1 className='text-5xl'>Products</h1>
                
                {/* Filters Section */}
                <div className=' flex items-center max-w-[20rem]'>
                    <div className=' mt-5 md:mt-0'>
                        <div className=' flex flex-col'>
                            <input
                                type='text'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Search by product name'
                                className=' focus:outline-none rounded-none border border-black p-2 max-w-[16rem] border-b-0'
                            />
                        </div>
                        
                        <div className=' flex'>
                                <input
                                    type='number'
                                    id='minPrice'
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder='Min Price'
                                    className='focus:outline-none rounded-none border border-black p-2 max-w-[8rem] border-r-0'
                                />

                                <input
                                    type='number'
                                    id='maxPrice'
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder='Max Price'
                                    className='focus:outline-none rounded-none border border-black p-2 max-w-[8rem]'
                                />
                        </div>
                    </div>
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

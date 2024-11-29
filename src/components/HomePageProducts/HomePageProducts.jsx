'use client';

import ProductPlaceholder from '@/utils/ProductPlaceholder';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HomePageProducts() {
    const [fetchNewArrival, setFetchNewArrival] = useState(false);
    const [newArrival, setNewArrival] = useState([]);
    
    const [fetchingTrending, setFetchingTrending] = useState(false);
    const [trending, setTrending] = useState([]);

    const [type, setType] = useState('trending');

    useEffect(() => {
        const fetchProducts = async () => {
            if (type === 'trending') {
                setFetchingTrending(true);
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/products/trending');
                    const data = await response.json();

                    if (response.ok) {
                        setFetchingTrending(false);
                        setTrending(data);
                    }
                } catch (error) {
                    setFetchingTrending(false);
                    console.error("Error fetching trending products:", error);
                }
            } else if (type === 'new-arrivals') {
                setFetchNewArrival(true);
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/products/new-arrivals');
                    const data = await response.json();

                    if (response.ok) {
                        setFetchNewArrival(false);
                        setNewArrival(data);
                    }
                } catch (error) {
                    setFetchNewArrival(false);
                    console.error("Error fetching new arrivals:", error);
                }
            }
        };

        fetchProducts();
    }, [type]); // Fetch data whenever the type changes

    return (
        <div className='container px-10 mx-auto pb-20'>
            <div className="flex bg-black p-1 mb-4 max-w-96">
                <button
                    type="button"
                    onClick={() => setType('trending')}
                    className={`flex-1 p-1 ${type === 'trending' ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                    Trending
                </button>
                <button
                    type="button"
                    onClick={() => setType('new-arrivals')}
                    className={`flex-1 p-1 ${type === 'new-arrivals' ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                    New Arrivals
                </button>
            </div>

            <div>
                <div className={`${type === 'trending' ? 'block' : 'hidden'}`}>
                    {fetchingTrending ? (
                        <ProductPlaceholder />
                    ) : type === 'trending' && trending.length > 0 ? (
                        <div className="flex flex-wrap justify-center md:justify-start gap-10">
                            {trending?.map((el) => (
                                <Link href={`/products/${el._id}`} key={el._id} className="border-2 border-gray-400 p-5 hover:border-2 hover:border-black transition duration-150 ease-in-out space-y-2 max-w-64">
                                    <div className="relative h-40 w-56">
                                        <Image className="absolute object-contain" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt="product image" fill />
                                    </div>
                                    <div className='flex items-start gap-2 justify-between'>
                                        <h2>{el.name}</h2>
                                        <p>${el.price}</p>
                                    </div>
                                    <p className='text-sm line-clamp-3'>{el.description}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className=' h-72 flex items-center justify-center'>No Product Found</p> 
                    )}
                </div>


                <div className={`${type === 'new-arrivals' ? 'block' : 'hidden'}`}>
                    {fetchNewArrival ? (
                        <ProductPlaceholder />
                    ) : type === 'new-arrivals' && newArrival.length > 0 ? (
                        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start md:overflow-scroll gap-10">
                            {newArrival?.map((el) => (
                                <Link href={`/products/${el._id}`} key={el._id} className="border-2 border-gray-400 p-5 hover:border-2 hover:border-black transition duration-150 ease-in-out space-y-2 max-w-64">
                                    <div className="relative h-40 w-56">
                                        <Image className="absolute object-contain" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt="product image" fill />
                                    </div>
                                    <div className='flex items-start gap-2 justify-between'>
                                        <h2>{el.name}</h2>
                                        <p>${el.price}</p>
                                    </div>
                                    <p className='text-sm line-clamp-3'>{el.description}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className=' h-72 flex items-center justify-center'>No Product Found</p> 
                    )}
                </div>

            </div>
        </div>
    );
}

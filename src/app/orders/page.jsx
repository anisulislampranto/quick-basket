'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function page() {
    const {user} = useSelector((state) => state.user)
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('token')
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/orders', 
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (res.ok) {
                    const data = res.json();
                    setOrders(data.orders)
                }
            } catch (error) {
                console.log('error', error);
            }
            
        })()
    },[])

    return (
        <div className=' container mx-auto py-10 px-10'>
            <h1 className=' text-5xl'>My Orders</h1>

            <ul>
                {
                    orders.length === 0 ? <p className=' text-center'>You have no orders yet!!</p> : 
                    <div>
                        
                    </div>
                }
            </ul>
        </div>
    )
}

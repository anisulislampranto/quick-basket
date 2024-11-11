'use client';

import usePlaceOrder from '@/hooks/usePlaceOrder';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Checkout() {
    const { user } = useSelector((state) => state.user);
    const { cartProducts, totalPrice } = useSelector((state) => state.cartProducts);
    const {handlePlaceOrder, placeOrderLoading, placeOrderSuccess, placeOrderError} = usePlaceOrder()
    const deliveryCharge = 100;
    const router = useRouter();
    const [coupons, setCoupons] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const totalWithDeliveryAfterDiscount = totalPrice + deliveryCharge - discount;

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupons`);
                if (res.ok) {
                    const data = await res.json();
                    setCoupons(data.data);
                }
            } catch (error) {
                console.log('error', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!user?.email) {
            router.back();
        }
    }, [user]);

    // Function to handle applying the coupon
    const applyCoupon = () => {
        const coupon = coupons.find(c => c.code === couponCode && c.isActive);
        
        if (!coupon) {
            setError('Invalid or inactive coupon code');
            setDiscount(0);
            return;
        }

        // Check if the order meets the minimum order value
        if (coupon.minimumOrderValue && totalPrice < coupon.minimumOrderValue) {
            setError(`Minimum order value of $${coupon.minimumOrderValue} is required`);
            setDiscount(0);
            return;
        }

        // Calculate discount based on the coupon type
        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = (totalPrice * coupon.discountValue) / 100;
        } else if (coupon.discountType === 'fixed') {
            discountAmount = coupon.discountValue;
        }

        setDiscount(discountAmount);
        setError('');
    };

    return (
        <div className='container px-10 mx-auto space-y-10 py-16'>
            <h1 className='text-4xl'>Checkout</h1>

            <div className='flex flex-col-reverse gap-10 xl:flex-row'>
                <ul className='flex flex-col gap-5'>
                    {cartProducts.map((el) => (
                        <li key={el._id} className='grid grid-cols-7 gap-10 justify-between items-center'>
                            <div className='relative h-12 w-12 mr-2'>
                                <Image className='absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt='image' fill />
                            </div>
                            <p className='col-span-2'>{el.name}</p>
                            <p className='col-span-2 xl:col-span-1'>Quantity: {el.quantity}</p>
                            <p className='col-span-2 xl:col-span-1'>Price: ${el.totalPrice}</p>
                        </li>
                    ))}
                </ul>

                <div className='shadow-md p-5 xl:fixed xl:top-40 xl:right-20 flex flex-col gap-5 h-[28rem]'>
                    <p className='text-lg'>Total Amount: ${totalPrice}</p>
                    <p>Delivery Charge: $100</p>
                    <p className='text-lg'>With Delivery Charge: ${totalWithDeliveryAfterDiscount}</p>
                    {error && <p className='text-red-600'>{error}</p>}
                    {discount > 0 && <p className='text-green-600'>Discount Applied: -${discount}</p>}
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder='Enter coupon code'
                            className='border border-black rounded-none focus:outline-none p-2'
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <input
                            type="button"
                            value="Apply Coupon"
                            className='p-2 border border-black hover:bg-black hover:text-white cursor-pointer'
                            onClick={applyCoupon}
                        />
                    </form>
                    

                    <form className='flex flex-col gap-4'>
                        <textarea onChange={(e)=> setDeliveryAddress(e.target.value)} placeholder='Enter Delivery Address . . .' className='border border-black rounded-none focus:outline-none p-2' />
                        <input onClick={() => handlePlaceOrder(cartProducts, totalWithDeliveryAfterDiscount , deliveryAddress)} type="button" value="Place Order" className='p-2 border border-black hover:bg-black hover:text-white cursor-pointer' />
                    </form>

                    {
                        placeOrderError && <span className=' text-red-600'>{placeOrderError}!!</span>
                    }
                    
                </div>
            </div>
        </div>
    );
}

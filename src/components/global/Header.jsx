'use client';

import Image from 'next/image'
import React, { useEffect, useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from 'next/link';
import logo from '../../assets/quick-basket.png'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearUser, fetchMe } from '@/lib/features/user/userSlice';
import { BsCart2 } from "react-icons/bs";
import SheetWrapper from '../ui/SheetWrapper';
import CartData from '../CartData/CartData';
import { AlertWrapper } from '../ui/AlertWrapper';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

const navLinks = [
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'Products',
        url: '/products'
    },
    {
        label: 'My Shop',
        url: '/my-shop'
    },
    {
        label: 'Orders',
        url: '/orders'
    },
]

export default function HeaderClient() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { cartProducts } = useSelector((state) => state.cartProducts);

    useEffect(() => {
        const token = localStorage.getItem('quickBasketToken')
        if (token && !user?.email) {
            dispatch(fetchMe());
        }
    }, []);

    const handleLogout = () => {
        dispatch(clearUser);
        localStorage.removeItem('quickBasketToken');
        window.location.reload();
    }

    const filteredNavLinks = navLinks.filter((el) => {
        if (!user?.name) {
            return el.label === 'Home' || el.label === 'Products';
        }
        if (user?.type === 'seller' && el.label === 'Orders') {
            return false;
        }
        if (user?.type === 'customer' && el.label === 'My Shop') {
            return false;
        }
        if (user?.type === 'admin') {
            return el.label === 'Orders';
        }
        return true;
    });

    return (
        <>
            <div className=' sticky top-0 z-50 bg-white shadow'>
                <div className=' flex items-center justify-between text-black lg:bg-transparent px-5 gap-5 relative md:px-24'>
                    <Link href={'/'} className=' relative h-24 w-24'>
                        <Image src={logo} alt='logo' fill className=' absolute object-cover' quality={50} />
                    </Link>

                    <div className=' hidden lg:flex items-center justify-between gap-5 font-poppinsRegular'>
                        {
                            filteredNavLinks.map((el) => (
                                <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                            ))
                        }

                        {
                            !user?.name &&
                            <Link href={'/signup'} className='hover:text-gray-500 cursor-pointer'>
                                Sign up
                            </Link>
                        }

                        {
                            user?.name &&
                            <AlertWrapper openButton={
                                <button className='hover:text-gray-500 cursor-pointer'>
                                    {user?.name}
                                </button>
                            }>
                                <div className=' flex flex-col'>
                                    <div className=' flex gap-2 text-xl'>
                                        Welcome <strong>{user?.name}</strong>
                                    </div>
                                    <div className=' flex justify-end gap-3'>
                                        <button onClick={handleLogout} className=' bg-red-700 text-white p-3'>Logout</button>
                                        <AlertDialogCancel className=' bg-black text-white p-3'>Cancel</AlertDialogCancel>
                                    </div>
                                </div>
                            </AlertWrapper>
                        }

                        {
                            user?.type === 'customer' && 
                            <SheetWrapper openButton={
                                <span className=' relative '>
                                    <BsCart2 className=' w-6 h-6' /> 
                                    <span className=' z-50 absolute -top-4 -right-4 bg-black text-white border rounded-full h-6 w-6 text-sm'>
                                        {cartProducts?.length}
                                    </span> 
                                </span>
                            }>
                                <CartData />
                            </SheetWrapper>
                        }

                        
                    </div>

                    {/* Small Screen */}
                    <div className='  items-center gap-10 flex lg:hidden overflow-scroll'>
                        {
                            user?.type === 'customer' && 
                            <SheetWrapper openButton={
                                <span className=' relative w-7 h-7'>
                                    <BsCart2 className=' w-6 h-6' /> 
                                    <span className=' absolute -top-1 -right-4 bg-black text-white border rounded-full h-6 w-6 text-sm'>
                                        {cartProducts?.length}
                                    </span> 
                                </span>
                            }>
                                <CartData />
                            </SheetWrapper>
                        }

                        <button onClick={() => setOpen(!open)}>
                            {open ? <RiCloseLargeLine className=' w-8 h-8 text-black' /> : <RxHamburgerMenu className=' w-8 h-8 text-black' />} 
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown For Small screen */}
            <div 
                className={`bg-white z-50 fixed top-24 w-full text-2xl gap-10 text-center flex flex-col font-poppinsRegular border-b ${open ? 'h-screen opacity-100 py-10' : 'h-0 opacity-0'} transition-all duration-300 ease-in-out overflow-hidden`}
            >
                {
                    filteredNavLinks.map((el) => (
                        <Link onClick={() => setOpen(false)} href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                    ))
                }
                {
                    user?.name &&
                    <AlertWrapper openButton={
                        <button className='hover:text-gray-500 cursor-pointer'>
                            {user?.name}
                        </button>
                    }>
                        <div className=' flex flex-col'>
                            <div className=' flex gap-2 text-xl'>
                                Welcome <strong>{user?.name}</strong>
                            </div>
                            <div className=' flex justify-end gap-3'>
                                <button onClick={handleLogout} className=' bg-red-700 text-white p-3'>Logout</button>
                                <AlertDialogCancel className=' bg-black text-white p-3'>Cancel</AlertDialogCancel>
                            </div>
                        </div>
                    </AlertWrapper>
                }
            </div>
        </>
    );
}


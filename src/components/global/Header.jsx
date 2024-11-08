'use client';

import Image from 'next/image'
import React, {useContext, useEffect, useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from 'next/link';
import logo from '../../assets/quick-basket.png'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchMe } from '@/lib/features/user/userSlice';



const navLinks = [
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'Shops',
        url: '/shops'
    },
    {
        label: 'Products',
        url: '/products'
    },
    {
        label: 'My Shop',
        url: '/my-shop'
    },
]


export default function HeaderClient() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.length === 0) {
            dispatch(fetchMe());
        }
    }, [dispatch, user]);


    return (
        <>
            <div className=' sticky top-0 z-50 bg-white shadow'>
                    <div className=' flex items-center justify-between text-black lg:bg-transparent px-5 gap-5 relative md:px-24'>
                        <Link href={'/'} className=' relative h-24 w-24'>
                            <Image src={logo} alt='logo' fill className=' absolute object-cover' quality={50} />
                        </Link>

                        <div className=' hidden lg:flex items-center justify-between gap-5 font-poppinsRegular'>
                            {
                                navLinks.map((el) => 
                                    <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                                )
                            }

                            <Link href={ user?.name ? '/profile' : '/signup'} className='hover:text-gray-500 cursor-pointer' >{user?.name ? user?.name : 'Sign up'}</Link>
                        </div>

                        {/* For Small Screen */}
                        <button className=' block lg:hidden' onClick={() => setOpen(!open)} >
                            {
                                open ? <RiCloseLargeLine className=' w-8 h-8 text-black' /> : <RxHamburgerMenu className=' w-8 h-8 text-black' /> 
                            }
                        </button>
                    </div>
            </div>

            {/* Dropdown For Small screen */}
            <div 
                className={`bg-white z-50 sticky top-24 w-full text-2xl gap-10 text-center flex flex-col font-poppinsRegular border-b ${open ? 'h-screen opacity-100 py-10' : 'h-0 opacity-0'} transition-all duration-300 ease-in-out overflow-hidden`}
            >
                {
                    navLinks.map((el) => 
                        <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                    )
                }
                <Link onClick={() => setOpen(false)} type='button' href={ user?.name ? '/profile' : '/signup'} className='hover:text-gray-500 cursor-pointer'>
                    {user?.name ? user?.name : 'Sign up'}
                </Link>
            </div>

        </>
    )
}
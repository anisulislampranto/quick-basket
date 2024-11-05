'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation'
import React from 'react';
import Logo from '../../assets/quick-basket.png'
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import DropBorder from '../ui/DropBorder';
import Link from 'next/link';
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import useGoogleOAuthLogin from '@/hooks/useGoogleOAuthLogin';


export default function AuthenticationClient() {
    const { googleLogin, loading, error } = useGoogleOAuthLogin();
    const pathname = usePathname();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);


    return (
        <div className=' flex items-center justify-center w-screen h-screen py-10 p-5'>
            <DropBorder>
                <div className='max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center bg-white p-3 md:p-14'>
                    <div className=' flex flex-col items-center w-full md:w-[55%]'>
                        <div className='relative h-52 w-52 md:h-80 md:w-80'>
                            <Image className=' absolute object-contain' src={Logo} alt='SignUpImage' fill />
                        </div>
                        <div className=' text-center space-y-3'>
                            <h1 className='text-5xl font-bold'>Sign In</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, molestias iure. Animi, adipisci. Quisquam facilis atque laboriosam reiciendis. Ea, totam.</p>
                        </div>
                    </div>

                    <div className=' w-full md:w-[40%]'>
                        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-3'>
                            {
                                pathname === '/signup' && 
                                <div className=' flex flex-col'>
                                    <label htmlFor="name">Name</label>
                                    <input type='text' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Full Name" {...register("name", {required: 'Name is Required'})} />
                                    {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                </div>
                            }


                            <div className=' flex flex-col'>
                                <label htmlFor="email">Email</label>
                                <input type='email' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Email" {...register("email", {required: 'Email is Required'})} />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                            </div>

                            <div className=' flex flex-col'>
                                <label htmlFor="password">Password</label>
                                <input type='password' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Password" {...register("password", {required: 'Password is Required'})} />
                                {errors.password && <span className=' text-red-600'>{errors.password.message}</span>}
                            </div>

                            <p>Already have an account ? try <Link href={pathname === '/signup' ? 'signin' : 'signup'} className=' text-blue-500 underline'>{pathname === '/signup' ? 'Sign In' : 'Sign Up'}</Link> </p>

                            {/* <input type="submit" className='' /> */}
                            <div className=' flex justify-end'>
                                <Button type={'submit'} text={pathname === '/signup' ? 'Sign Up' : 'Sign In'} className={' mt-2'} />
                            </div>

                            <div className="flex items-center justify-center">
                                <hr className="w-full h-px bg-gray-200 border-0 dark:bg-black" />
                                <span className="px-4 text-center">Or</span>
                                <hr className="w-full h-px bg-gray-200 border-0 dark:bg-black" />
                            </div>

                            <div className=' flex flex-wrap justify-center gap-10'>
                                <button type='button' onClick={googleLogin} className=' border border-black p-1 hover:bg-black hover:text-white'>
                                    <FaGoogle className='w-8 h-8 ' />
                                </button>
                                <button type='button' className=' border border-black p-1 hover:bg-black hover:text-white'>
                                    <FaFacebookF className='w-8 h-8 ' />
                                </button>
                                <button type='button' className=' border border-black p-1 hover:bg-black hover:text-white'>
                                    <FaGithub className='w-8 h-8' />
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </DropBorder>
        </div>
    )
}

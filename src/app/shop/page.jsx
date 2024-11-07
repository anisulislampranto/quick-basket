'use client';

import Button2 from '@/components/ui/Button2';
import React from 'react';
import { useSelector } from 'react-redux';
import { GiShop } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import ShopImage from '../../assets/shop-removebg-preview.png'
import DropBorder from '@/components/ui/DropBorder';


export default function ShopClient() {
    const {user} = useSelector((state) => state.user);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const handleAddShop = async (data) => {
        const token = localStorage.getItem('token')
        try {
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("image", data.image[0])
            formData.append('description', data.description)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shop/create`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })

            const createdShop = await res.json();

            console.log('resShop', res);
            

            if (res.ok) {
                console.log('shop created', createdShop);
            }

        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className=' flex items-center justify-center w-screen h-[95vh] py-10 p-5'>

            {
                (user?.type === 'seller' && !user?.shop) ? 
                <DropBorder>
                    <div className='flex flex-col md:flex-row items-center gap-10 mx-auto w-full'>
                        <div className=' relative h-96 w-96'>
                            <Image className=' absolute object-contain' src={ShopImage} alt='ShopImage' fill />
                        </div>

                        <form onSubmit={handleSubmit(handleAddShop)} className=' flex flex-col gap-3 py-5'>
                            <div className=' flex flex-col'>
                                <label htmlFor="name">Name</label>
                                <input type='text' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Shop Name" {...register("name", {required: 'Shop Name is Required'})} />
                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                            </div>


                            <div className=' flex flex-col'>
                                <label htmlFor="image">Image</label>
                                <input type='file' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Email" {...register("image", {required: 'Image is Required'})} />
                                {errors.image && <span className='text-red-600'>{errors.image.message}</span>}
                            </div>

                            <div className=' flex flex-col'>
                                <label htmlFor="description">Description</label>
                                <textarea type='textarea' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Shop Description" {...register("description", {required: 'Description is Required'})} />
                                {errors.description && <span className=' text-red-600'>{errors.description.message}</span>}
                            </div>


                            <div className=' flex justify-end'>
                                <Button text={<div className=' flex items-center gap-2'>Add Shop<GiShop /></div>} type={'submit'} />
                            </div>
                        </form>
                    </div>
                </DropBorder> : 'hello'

            }

            
        </div>
    )
}

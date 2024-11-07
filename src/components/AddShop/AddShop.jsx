import React from 'react';
import ShopImage from '../../assets/shop-removebg-preview.png'
import DropBorder from '@/components/ui/DropBorder';
import { useRouter } from 'next/navigation';
import useAddShop from '@/hooks/useAddShop';
import { GiShop } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';


export default function AddShopClient() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { handleAddShop,  addShopLoading, addShopError} = useAddShop();


    return (
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
                        <label htmlFor="logo">Logo</label>
                        <input type='file' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Shop Logo" {...register("logo", {required: 'Logo is Required'})} />
                        {errors.logo && <span className='text-red-600'>{errors.logo.message}</span>}
                    </div>

                    <div className=' flex flex-col'>
                        <label htmlFor="coverImage">Cover Image</label>
                        <input type='file' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Your Shop Cover Photo" {...register("coverImage", {required: 'Cover Image is Required'})} />
                        {errors.coverImage && <span className='text-red-600'>{errors.coverImage.message}</span>}
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
        </DropBorder> 
    )
}

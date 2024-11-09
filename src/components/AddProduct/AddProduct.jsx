'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import useAddProduct from '@/hooks/useAddProduct';
import { useForm } from 'react-hook-form';
import Loader2 from '@/utils/Loader2';
import DrawerWrapper from '../ui/DrawerWrapper';


export const categories = [
    {
        label: 'Electronics & Gadgets',
        value: 'electronics&Gadgets'
    },
    {
        label: 'Fashion & Apparel',
        value: 'fashion&Apparel'
    },
    {
        label: 'Beauty & Personal Care',
        value: 'beauty&PersonalCare'
    },
    {
        label: 'Home & Living',
        value: 'home&Living'
    },
]


export default function AddProductClient() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { handleAddProduct, addProductLoading, addProductError, addProductSuccess } = useAddProduct();

    return (
        <DrawerWrapper btnText={'+ Add Product'} heading={'Add Product'} subHeading={'Add Product For your shop'}>
            {
                addProductLoading ? <Loader2 />  : (addProductError && !addProductLoading) ? <p className=' text-center text-2xl md:text-5xl text-red-600 py-20'>{addProductError}</p> : (addProductSuccess && !addProductLoading) ? <h1 className=' py-20 text-center text-2xl md:text-5xl text-green-600'>Product Added Successfully!</h1> :  
                    <form onSubmit={handleSubmit(handleAddProduct)} className=' max-w-4xl mx-auto flex flex-col gap-3 py-5 px-10'>
                        <div className=' flex flex-wrap gap-5 justify-between'>
                            <div className=' flex flex-col w-full md:w-[46%]'>
                                <label htmlFor="name">Name</label>
                                <input type='text' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Name" {...register("name", {required: 'Product Name is Required'})} />
                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                            </div>

                            <div className=' flex flex-col w-full md:w-[46%]'>
                                <label htmlFor="category">Category</label>
                                <select {...register("category", {required: 'Category is required'})} className=' border p-[.6rem] border-black w-full'>
                                    {categories.map((el) => 
                                        <option key={el.value} value={el.value}>{el.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>


                        <div className=' flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <textarea type='textarea' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Description" {...register("description", {required: 'Product Description is Required'})} />
                            {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                        </div>

                        {/* Multiple Images Selection */}
                        <div className='flex flex-col w-full'>
                            <label htmlFor="images">Images</label>
                            <input
                                type='file'
                                className='border border-black p-2'
                                accept="image/*"
                                multiple
                                {...register("images", { required: 'At least one image is required' })}
                            />
                            {errors.images && <span className='text-red-600'>{errors.images.message}</span>}
                        </div>

                        <div className=' flex flex-wrap justify-between gap-5'>
                            <div className=' flex flex-col w-full md:w-[46%]'>
                                <label htmlFor="price">Price</label>
                                <input type='number' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product per unit price" {...register("price", {required: 'Product Price is Required'})} />
                                {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
                            </div>

                            <div className=' flex flex-col w-full md:w-[46%]'>
                                <label htmlFor="stock">Stock</label>
                                <input type='number' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Stock" {...register("stock", {required: 'Product Stock is Required'})} />
                                {errors.stock && <span className='text-red-600'>{errors.stock.message}</span>}
                            </div>
                        </div>

                        <div className=' flex justify-end'>
                            <Button text={<div className=' flex items-center gap-2'> Submit</div>} type={'submit'} />
                        </div>
                    </form>
            }
        </DrawerWrapper>
    )
}

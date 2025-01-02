import useEditProduct from '@/hooks/useEditProduct';
import Loader2 from '@/utils/Loader2';
import React from 'react'
import { useForm } from 'react-hook-form';
import { categories } from '../AddProduct/AddProduct';
import Button from '../ui/Button';

export default function EditProduct({product}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { handleEditProduct, editProductLoading, editProductError, editProductSuccess } = useEditProduct()

    return (
        <>
            {
                editProductLoading ? <Loader2 /> : (editProductError && !editProductLoading) ? <p className=' text-center text-2xl md:text-5xl text-red-600 py-20'>{editProductError}</p> : (editProductSuccess && !editProductLoading) ? <h1 className=' py-20 text-center text-2xl md:text-5xl text-green-600'>Product Edited Successfully!</h1> : 
                <form onSubmit={handleSubmit((data) => handleEditProduct(data, product._id))} className=' max-w-4xl mx-auto flex flex-col gap-3 py-5 px-10'>

                    <div className=' flex flex-wrap gap-5 justify-between'>
                        <div className=' flex flex-col w-full md:w-[46%]'>
                            <label htmlFor="name">Name</label>
                            <input defaultValue={product.name} type='text' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Name" {...register("name")} />
                            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                        </div>

                        <div className=' flex flex-col w-full md:w-[46%]'>
                            <label htmlFor="category">Category</label>
                            <select {...register("category")} className=' border p-[.6rem] border-black w-full'>
                                <option defaultChecked defaultValue={product.category} key={product.category} value={product.category}>{product.category}</option>
                                {categories?.map((el) => 
                                    <option key={el.value} value={el.value}>{el.label}</option>
                                )}
                            </select>
                        </div>
                    </div>


                    <div className=' flex flex-col'>
                        <label htmlFor="description">Description</label>
                        <textarea defaultValue={product.description} type='textarea' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Description" {...register("description")} />
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
                            {...register("images")}
                        />
                        {errors.images && <span className='text-red-600'>{errors.images.message}</span>}
                    </div>

                    <div className=' flex flex-wrap justify-between gap-5'>
                        <div className=' flex flex-col w-full md:w-[46%]'>
                            <label htmlFor="price">Price</label>
                            <input defaultValue={product.price} type='number' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product per unit price" {...register("price")} />
                            {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
                        </div>

                        <div className=' flex flex-col w-full md:w-[46%]'>
                            <label htmlFor="stock">Stock</label>
                            <input defaultValue={product.stock} type='number' className=' w-full border border-black p-2 rounded-none ring-0 outline-none focus:border-b-2 focus:border-black' placeholder="Enter Product Stock" {...register("stock")} />
                            {errors.stock && <span className='text-red-600'>{errors.stock.message}</span>}
                        </div>
                    </div>

                    <div className=' flex justify-end'>
                        <Button text={<div className=' flex items-center gap-2'> Submit</div>} type={'submit'} />
                    </div>
                </form>
            }

            
        </>
    )
}

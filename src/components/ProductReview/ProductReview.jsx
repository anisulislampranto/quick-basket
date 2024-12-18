'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';


export default function ProductReview({product}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {user} = useSelector((state) => state.user);
    const activeProduct = product?.product ? product?.product : product

    console.log('====================================');
    console.log('productttttt', product);
    console.log('====================================');

    const alreadyReviewed = activeProduct?.reviews?.find((el) => el.user === user._id)


    const onSubmit = async (data) => {

      try {
        setLoading(true)
        const token = localStorage.getItem('quickBasketToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${activeProduct?._id}/review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || 'Could not add review');

        if (response.ok) {
          setSuccess(true);
          setLoading(false);
          reset();
          window.location.reload();
        }
      
      } catch (err) {
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 3000);
        console.error(err);
      }
    };




    return (
        <>
          <div className=' flex flex-col md:flex-row gap-5'>
            <div className=' relative h-[8rem] w-full md:w-[30%]'>
              <Image className='absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${activeProduct?.images?.[0]}`} alt='image' fill />
            </div>
            <div className=' w-full md:w-[75%]'>
              <h1>{activeProduct?.name}</h1>
              <p>${activeProduct?.price}</p>
              <p className=' line-clamp-3'>{activeProduct?.description}</p>
            </div>      
          </div>

          {
            alreadyReviewed ?
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    style={{
                      color: index < alreadyReviewed?.rating ? 'gold' : 'gray',
                      fontSize: '20px',
                      marginRight: '2px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{alreadyReviewed.comment}</p>
            </div> 
            :
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className=' flex flex-col'>
                  <label>Rating</label>
                  <select
                    {...register('rating', { required: 'Rating is required' })}
                    className=' border-2 border-black p-2 focus:outline-none'
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  {errors.rating && <p style={{ color: 'red' }}>{errors.rating.message}</p>}
                </div>

                <div className=' flex flex-col'>
                  <label>Comment</label>
                  <textarea
                    className=' border-2 border-black p-2 focus:outline-none'
                    {...register('comment', { required: 'Comment is required' })}
                    placeholder="Write your comment here"
                  ></textarea>
                  {errors.comment && <p style={{ color: 'red' }}>{errors.comment.message}</p>}
                </div>

                <button className=' justify-end mt-3 flex bg-black border-2 border-black text-white hover:bg-white hover:text-black p-3' type="submit">
                  {
                    loading ? 'Submitting' : (!loading && error) ? 'Failed' : (!loading && success) ? 'Success' : 'Submit' 
                  }
                </button>
            </form>
          }
      </>
    )
}
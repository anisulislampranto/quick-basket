import { decreaseCartProductQuantity, increaseCartProductQuantity, removeCartProduct } from '@/lib/features/cart/cartSlice';
import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";


export default function CartData() {
    const { cartProducts, totalPrice } = useSelector((state) => state.cartProducts);
    const dispatch = useDispatch()

  return (
    <div>
        <h1>Cart Products</h1>
        <ul className=' flex flex-col gap-5 mt-10'>
            {cartProducts.map((el) =>
                <li key={el._id} className=' grid grid-cols-9 gap-3 items-center justify-between'>
                    <button className=' hover:text-red-600' onClick={()=> dispatch(removeCartProduct(el._id))}>
                        <AiOutlineDelete className=' w-4 h-4' />
                    </button>

                    <div className='col-span-4 grid grid-cols-2 items-center'>
                        <div className=' relative h-12 w-12  mr-2'>
                            <Image className=' absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt='image' fill />
                        </div>
                        <p>{el.name}</p>
                    </div>
                    <p className=' flex items-center gap-2 col-span-2'> 
                        <button className=' px-2 border hover:border-red-600 hover:text-red-600' onClick={() => dispatch(decreaseCartProductQuantity(el._id)) } >-</button> 
                            {el.quantity} 
                        <button className=' px-2 border hover:border-green-600 hover:text-green-600'  onClick={() => dispatch(increaseCartProductQuantity(el._id)) }>+</button>
                    </p>
                    <p className=' col-span-2 justify-end flex'>${el.totalPrice}</p>
                </li>
            )}
        </ul>
        <div className=' flex justify-between mt-10'>
            <p>Total Price:</p>
            <p>${totalPrice}</p>
        </div>
    </div>
  )
}

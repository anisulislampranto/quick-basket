'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DropBorder from '../ui/DropBorder';
import { FaEdit } from "react-icons/fa";
import EditProduct from '../EditProduct/EditProduct';
import DrawerWrapper from '../ui/DrawerWrapper';
import { useSelector } from 'react-redux';
import ShopChat from '../Chat/ShopChat';

function CategoryProducts({ title, products }) {
  return (
    <div className="space-y-5 mt-10">
        <DropBorder>
            <h1 className=' text-sm'>{title}</h1>
        </DropBorder>
        <ul className="flex flex-wrap md:flex-nowrap justify-center md:justify-start md:overflow-scroll gap-10">
          {products.length > 0 ? products.map((el) => (
            <li key={el._id} className="border-2 border-gray-400 p-5 hover:border-2 hover:border-black transition duration-150 ease-in-out space-y-2">
                <div className="relative h-40 w-56">
                  <Image className="absolute object-contain" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.images[0]}`} alt="product image" fill />
                  {/* Edit Product Drawer */}
                  <DrawerWrapper heading={'Edit Product'} subHeading={'Edit Product of your shop.'} openButton={<button className=' border border-black p-1 bg-white absolute -top-3 -right-3'><FaEdit className=' w-5 h-5' /></button>}>
                    <EditProduct product={el} />
                  </DrawerWrapper>
                  {/* Edit Product Drawer */}
                </div>
                <div className='flex items-start gap-2 justify-between'>
                  <h2>{el.name}</h2>
                  <p>${el.price}</p>
                </div>

                <div className='flex justify-between'>
                  <p>Stock</p>
                  <p className={`${el.stock < 5 && 'text-red-600'}`}>{el.stock}</p>
                </div>
            </li>
          )) : <p>No Product Available</p>}
        </ul>
    </div>
  );
}
export default function ShopProducts({ products, type, setType, shopOrders, fetchOrders, setFetchOrders, shop }) {
  const activeProducts = products.filter((el) => el.isActive);
  const { user } = useSelector((state) => state.user);
  const [loadingItem, setLoadingItem] = useState();
  const [errorItem, setErrorItem] = useState();

  const [orderLoading, setOrderLoading] = useState();
  const [orderError, setOrderError] = useState();
  const [orderSuccess, setOrderSuccess] = useState();

  const [orderType, setOrderType] = useState('pending');

  const categories = [
    { title: 'Home And Living Products', products: activeProducts.filter((el) => el.category === 'home&Living') },
    { title: 'Beauty And Personal Care Products', products: activeProducts.filter((el) => el.category === 'beauty&PersonalCare') },
    { title: 'Fashion And Apparel Products', products: activeProducts.filter((el) => el.category === 'fashion&Apparel') },
    { title: 'Electronics And Gadgets Products', products: activeProducts.filter((el) => el.category === 'electronics&Gadgets') },
  ];

  const acceptOrderItem = async (orderId, itemId) => {
    setLoadingItem(itemId);
    try {
      const token = localStorage.getItem('quickBasketToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}/item/${itemId}/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoadingItem(null);
        setOrderSuccess(true);
        setFetchOrders(fetchOrders + 1);
      }
    } catch (error) {
      setErrorItem(itemId);

      setTimeout(() => {
        setErrorItem(null);
      }, 3000);

      setLoadingItem(null);
      console.error("Error accepting order item:", error);
    }
  };

  const handleAcceptAll = async (orderId) => {
    setOrderLoading(orderId);
    try {
      const token = localStorage.getItem('quickBasketToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}/accept-all-items/${user.shop?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrderLoading(null);
        setOrderSuccess(orderId);
        setFetchOrders(fetchOrders + 1); 
        console.log(data.message); 
      } else {
        setOrderLoading(null);
        setOrderError('');
        console.error('Failed to accept all items:', data.message);
      }
    } catch (error) {
      setOrderLoading(null);
      setOrderError('');
      console.error('Error in handleAcceptAll:', error);
    }
  };

  return (
    <div className="container px-5">
        <div className="flex bg-black p-1 mb-4 w-80 md:w-96 mt-10 md:mt-0">
            <button
                type="button"
                onClick={() => setType('products')}
                className={`flex-1 p-1 ${type === 'products' ? 'bg-white text-black' : ' bg-black text-white'}`}
            >
                Products
            </button>
            <button
                type="button"
                onClick={() => setType('orders')}
                className={`flex-1 p-1 ${type === 'orders' ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
                Orders
            </button>
            <button
                type="button"
                onClick={() => setType('messages')}
                className={`flex-1 p-1 ${type === 'messages' ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
                Messages
            </button>
        </div>

        {type === 'products' ? (
          categories.map((category) => (
            <CategoryProducts key={category.title} title={category.title} products={category.products} />
          ))
        ) : type === 'messages' ? 
          <>
            <ShopChat shopId={shop._id} />
          </> 
        : (
          <>
            <div className="flex bg-black p-1 mb-4 w-96 mt-10 md:mt-0">
              <button
                  type="button"
                  onClick={() => setOrderType('pending')}
                  className={`flex-1 p-1 ${orderType === 'pending' ? 'bg-white text-black' : ' bg-black text-white'}`}
              >
                  Pending
              </button>
              <button
                  type="button"
                  onClick={() => setOrderType('accepted')}
                  className={`flex-1 p-1 ${orderType === 'accepted' ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                  Accepted
              </button>
          </div>

          {shopOrders?.length > 0 ? (
            <ul className='flex flex-col gap-10 mt-10'>
              {shopOrders.map((order) => {
                const filteredItems = order.items?.filter(item => item.product.shop === user.shop?._id && item.orderStatus === orderType);
                
                return (
                  <li key={order._id}>
                    <div className='p-2 border-black border-2 border-e-4 flex justify-between'>
                      <p>Order Id: {order._id}</p>
                      <p className='capitalize'>Order: {order.orderStatus}</p>
                      <p className='capitalize'>Payment: <span className={`${order.payment.status === 'paid' ? 'text-green-700' : ' text-red-700'}`}>{order.payment.status}</span></p>
                    </div>

                    <div>
                      <div className='flex justify-end mt-3'>
                        <button onClick={() => handleAcceptAll(order._id)} className='bg-black text-white p-3 border-2 border-black hover:bg-white hover:text-black'>
                          {orderLoading && orderLoading === order._id ? 'Accepting' : orderError === order._id ? 'Failed' : 'Accept Whole Order'}
                        </button>
                      </div>
                      <div className='flex gap-10 mt-5 overflow-scroll'>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <div key={item._id} className='flex flex-col justify-between gap-2 border-2 border-black p-2 min-w-44'>
                              <div className='relative h-44 w-full'>
                                <Image className='absolute object-contain' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.product?.images?.[0]}`} alt='image' fill />
                              </div>
                              <p>Product: {item.product.name}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p className='capitalize'>Status: {item.orderStatus}</p>
                              {item.orderStatus !== 'accepted' && (
                                <button disabled={loadingItem === item._id} className='bg-black border-black border-2 text-white p-3 hover:bg-white hover:text-black' onClick={() => acceptOrderItem(order._id, item._id)}>
                                  {errorItem === item._id ? 'Failed' : loadingItem === item._id ? 'Accepting' : 'Accept'}
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No items found for {orderType} orders.</p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Orders Available</p>
          )}
          </>
        )}
    </div>
  );
}

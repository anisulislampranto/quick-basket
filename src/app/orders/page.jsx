'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader2 from '@/utils/Loader2';
import { useRouter } from 'next/navigation';
import { AlertWrapper } from '@/components/ui/AlertWrapper';
import { SiTicktick } from "react-icons/si";


import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from '@/components/ui/Modal';
import ProductReview from '@/components/ProductReview/ProductReview';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function StripePaymentForm({ setPaying, paying, onPaymentSuccess, customerId, orderId, totalAmount }) {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setPaying(true)
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaying(false)
      console.log('[error]', error);
    } else {
      setPaying(true)
      console.log('[PaymentMethod]', paymentMethod);
      onPaymentSuccess(paymentMethod, orderId, customerId, totalAmount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <label className="block text-sm font-medium text-gray-700 mb-1">Pay total ${totalAmount}</label>
      <CardElement className="p-2 border rounded-md" options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" className="mt-4 bg-black hover:bg-white hover:text-black border-2 border-black text-white p-2" disabled={!stripe}>
          {paying ? 'Paying' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function OrdersPage() {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const router = useRouter();
  const [fetchOrder, setFetchOrder] = useState(0);
  const [type, setType] = useState('all');
  const [paying, setPaying] = useState(false)


  useEffect(() => {
    (async () => {
        const token = localStorage.getItem('token');
        try {
          setFetchingOrders(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
            const data = await res.json();
              setFetchingOrders(false)
              setOrders(data.orders);
            }
        } catch (error) {
            setFetchingOrders(false)
            console.log('Error fetching orders:', error);
        } finally {
          setFetchingOrders(false)
        }
    })();
  }, [fetchOrder]);


  const onPaymentSuccess = async (paymentMethod, orderId, customerId, totalAmount) => {
    try {
      setPaying(true)
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount,
          orderId,
          customerId,
        }),
      });
    
      if (!response.ok) {
        throw new Error("Payment initiation failed.");
      }
      
      const data = await response.json();

      if (response.ok) {
        setPaying(false)
        setFetchOrder(fetchOrder + 1)
      }
    } catch (error) {
      setPaying(false)
      console.error("Payment initiation failed:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, newStatus }),
      });
  
      if (!response.ok) throw new Error('Failed to update status');
  
      const updatedOrder = await response.json();

      if (response.ok) {
        
          setOrders((prevOrders) => 
            prevOrders.map(order => 
              order._id === orderId ? { ...order, orderStatus: newStatus } : order
            )
          );
      
          if (newStatus === 'delivered') {
            window.location.reload(); 
          }
      }
  
      
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  

  useEffect(()=> {
    if (!user?.email) {
      router.push('signin')
    }
  }, [])

  return (
    <div className="container mx-auto py-20 px-10 min-h-[80vh]">
          <h1 className="text-5xl mb-10">{user.type === 'customer' &&  'My'} Orders</h1>
          <div className="flex bg-black p-1 mb-4 w-96">
              <button
                  type="button"
                  onClick={() => setType('all')}
                  className={`flex-1 p-1 ${type === 'all' ? 'bg-white text-black' : ' bg-black text-white'}`}
              >
                  All
              </button>
              <button
                  type="button"
                  onClick={() => setType('delivered')}
                  className={`flex-1 p-1 ${type === 'delivered' ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                  Delivered
              </button>
          </div>

      {
        fetchingOrders ? <Loader2 /> : !fetchingOrders && orders.length === 0 ? <p className=' text-center text-xl'>No orders yet</p> : !fetchingOrders && orders.length > 0 &&  
            <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">Order #</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Delivery Address</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.filter((order) => type === 'all' ? order.orderStatus !== 'delivered' : order.orderStatus === 'delivered')?.map((order, index) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                            {order.items?.map((product, i) => (
                              <span key={product.product._id} className=' flex items-center'>
                                  {product.orderStatus === 'accepted'? <SiTicktick className=' text-green-700 h-3 w-3'  /> : <SiTicktick className=' text-red-700 h-3 w-3' />}
                                  {
                                    (order.orderStatus === 'delivered' && user.type === 'customer') ?
                                      <Modal 
                                        openButton={<TableCell className="text-right hover:text-green-600 cursor-pointer">{product.product.name}</TableCell>}
                                        content={<ProductReview product={product} />} 
                                      /> : product.product.name
                                  }
                                  {i < order.items.length - 1 && ", "}
                              </span>
                            ))}
                        </TableCell>
                        <TableCell className={` capitalize ${order.payment.status === 'paid' ? 'text-green-700' : 'text-red-700'}`}>{order.payment.status}</TableCell>
                        <TableCell>{order.deliveryAddress}</TableCell>
                        <TableCell className=' capitalize'>
                          {user.type === 'admin' ? 
                              <select
                                name="orderStatus"
                                id="orderStatus"
                                value={order.orderStatus}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              >
                                <option value="pending" disabled={order.orderStatus === "pending" || order.orderStatus === "delivered"}>Pending</option>
                                <option value="processing" disabled={order.orderStatus === "processing" || order.orderStatus === "delivered"}>Processing</option>
                                <option value="shipped" disabled={order.orderStatus === "shipped" || order.payment.status === 'unpaid' || order.orderStatus === "delivered"}>Shipped</option>
                                <option value="delivered" disabled={order.orderStatus === "delivered" || order.payment.status === 'unpaid'}>Delivered</option>
                                <option value="cancelled" disabled={order.orderStatus === "cancelled" || order.orderStatus === "delivered"}>Cancelled</option>
                              </select>
                            : 
                            order.orderStatus
                          }
                          
                        </TableCell>
                        <TableCell className="text-right">${order.totalAmount}</TableCell>
                        {
                          order.payment.status === 'unpaid' && user.type !== 'admin' && 
                          <Modal 
                            openButton={
                              <TableCell className="text-right hover:text-green-600 cursor-pointer">Pay Now</TableCell>
                            }
                            content={
                              <div>
                                <h3 className="text-xl font-semibold">Complete Your Payment</h3>
                                <Elements stripe={stripePromise}>
                                  <StripePaymentForm setPaying={setPaying} paying={paying} totalAmount={order.totalAmount} orderId={order._id} customerId={user?._id} onPaymentSuccess={onPaymentSuccess} />
                                </Elements>
                              </div>
                            }
                          />
                        }
                        {
                          (order.orderStatus === 'delivered' && user.type === 'customer') &&  
                            <Modal 
                              openButton={<TableCell className="text-right hover:text-green-600 cursor-pointer">Review</TableCell>}
                              content={<ProductReview products={order?.items} />} 
                            />
                        }
                      </TableRow>
                  ))}
                </TableBody>
            </Table> 
      }
      
    </div>
  );
}

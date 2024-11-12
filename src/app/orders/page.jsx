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

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function StripePaymentForm({ onPaymentSuccess, customerId, orderId, totalAmount }) {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      onPaymentSuccess(paymentMethod, orderId, customerId, totalAmount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
      <CardElement className="p-2 border rounded-md" options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" className="mt-4 bg-green-600 text-white p-2 rounded-md" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}

export default function OrdersPage() {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const router = useRouter();
  const [fetchOrder, setFetchOrder] = useState(0)

  useEffect(() => {
    (async () => {
        setFetchingOrders(true)
        const token = localStorage.getItem('token');
        try {
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
        }
    })();
  }, [fetchOrder]);


  const onPaymentSuccess = async (paymentMethod, orderId, customerId, totalAmount) => {

    try {
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

      console.log('resData', data);

      if (data?.data?.url) {
        setFetchOrder(fetchOrder + 1)
        console.log('data', data);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  useEffect(()=> {
    if (!user?.email) {
      router.push('signin')
    }
  }, [])

  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-5xl mb-10">My Orders</h1>

      {
        fetchingOrders ? <Loader2 /> : !fetchingOrders && orders.length === 0 ? <p>No orders yet</p> : !fetchingOrders && orders.length > 0 &&  
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
                  {orders?.map((order, index) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                            {order.items?.map((product, i) => (
                            <span key={product.product._id}>
                                {product.product.name}
                                {i < order.items.length - 1 && ", "}
                            </span>
                            ))}
                        </TableCell>
                        <TableCell className={` capitalize ${order.payment.status === 'paid' ? 'text-green-700' : 'text-red-700'}`}>{order.payment.status}</TableCell>
                        <TableCell>{order.deliveryAddress}</TableCell>
                        <TableCell className=' capitalize'>{order.orderStatus}</TableCell>
                        <TableCell className="text-right">${order.totalAmount}</TableCell>
                        {
                          order.payment.status === 'unpaid' && 
                          <AlertWrapper 
                            openButton={
                              <TableCell className="text-right hover:text-green-600 cursor-pointer">Pay Now</TableCell>
                          }>
                            {/* Stripe Payment  */}
                            <div>
                              <h3 className="text-xl font-semibold">Complete Your Payment</h3>
                              <Elements stripe={stripePromise}>
                                <StripePaymentForm totalAmount={order.totalAmount} orderId={order._id} customerId={user?._id} onPaymentSuccess={onPaymentSuccess} />
                              </Elements>
                            </div>
                            {/* Stripe Payment */}
                          </AlertWrapper>
                        }
                      </TableRow>
                  ))}
                </TableBody>
            </Table> 
      }
      
    </div>
  );
}

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

export default function OrdersPage() {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-5xl mb-10">My Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order #</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
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
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.deliveryAddress}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell className="text-right">${order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

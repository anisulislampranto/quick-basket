"use client";

import { clearCart } from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const usePlaceOrder = () => {
  const { user } = useSelector((state) => state.user);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState(null);
  const [placeOrderSuccess, setPlaceOrderSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePlaceOrder = async (
    cartProducts,
    totalPrice,
    deliveryAddress
  ) => {
    console.log("cartProducts", cartProducts);
    console.log("totalPrice", totalPrice);
    console.log("deliveryAddress", deliveryAddress);

    if (!deliveryAddress) {
      setPlaceOrderError("Delivery Address is required");
      setTimeout(() => {
        setPlaceOrderError("");
      }, 3000);
      return;
    }

    const productsData = cartProducts.map((el) => ({
      shop: el.shop._id,
      product: el._id,
      quantity: el.quantity,
      price: el.price,
      orderStatus: "pending",
    }));

    console.log("productsData", productsData);

    try {
      const token = localStorage.getItem("token");
      setPlaceOrderLoading(true);
      setPlaceOrderError(null);

      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: productsData,
            totalPrice,
            deliveryAddress,
          }),
        }
      );

      console.log("response", response);

      if (response.ok) {
        setPlaceOrderSuccess(true);
        dispatch(clearCart());
        router.push("/orders");
        setTimeout(() => {
          setPlaceOrderSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);

      setPlaceOrderError(error.message || "Something went wrong");
      setTimeout(() => {
        setPlaceOrderError(null);
      }, 3000);
    } finally {
      setPlaceOrderLoading(false);
    }
  };

  return {
    handlePlaceOrder,
    placeOrderLoading,
    placeOrderSuccess,
    placeOrderError,
  };
};

export default usePlaceOrder;

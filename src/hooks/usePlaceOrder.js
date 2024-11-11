import { useState } from "react";
import { useSelector } from "react-redux";

export const usePlaceOrder = () => {
  const { user } = useSelector((state) => state.user);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState(null);
  const [placeOrderSuccess, setPlaceOrderSuccess] = useState(false);

  const handlePlaceOrder = async (
    cartProducts,
    totalPrice,
    deliveryAddress
  ) => {
    if (!deliveryAddress) {
      setPlaceOrderError("Delivery Address is required");
      setTimeout(() => {
        setPlaceOrderError("");
      }, 3000);
      return;
    }

    try {
      setPlaceOrderLoading(true);
      setPlaceOrderError(null);

      const productIds = cartProducts.map((product) => product.id);

      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: user._id,
            productIds,
            totalPrice,
            deliveryAddress,
          }),
        }
      );

      if (response.ok) {
        setPlaceOrderSuccess(true);
      }

      if (!response.ok) {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setPlaceOrderError(error.message || "Something went wrong");
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

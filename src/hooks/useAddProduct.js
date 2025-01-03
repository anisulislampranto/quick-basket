"use client";

import { fetchMe, setProduct } from "@/lib/features/user/userSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useAddProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState(null);
  const [addProductSuccess, setAddProductSuccess] = useState(false);

  const handleAddProduct = async (data, reset) => {
    const token = localStorage.getItem("quickBasketToken");
    setAddProductLoading(true);
    setAddProductError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("shop", user?.shop?._id);

      // Append each image file separately
      if (data.images && data.images.length > 0) {
        for (const image of data.images) {
          formData.append("images", image);
        }
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/create`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await res.json();

      console.log("res", res);
      console.log("result", result);

      if (res.ok) {
        reset();
        setAddProductSuccess(true);
        dispatch(setProduct(result.product));

        setTimeout(() => {
          setAddProductSuccess(false);
        }, 3000);
      } else {
        setAddProductError(result.message || "Failed to add product");
        setTimeout(() => {
          setAddProductError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setAddProductError("An error occurred. Please try again later.");
      setTimeout(() => {
        setAddProductError(null);
      }, 3000);
    } finally {
      setAddProductLoading(false);
    }
  };

  return {
    handleAddProduct,
    addProductLoading,
    addProductError,
    addProductSuccess,
  };
};

export default useAddProduct;

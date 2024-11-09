"use client";

import { fetchMe, setProduct } from "@/lib/features/user/userSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const useEditProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [editProductError, setEditProductError] = useState(null);
  const [editProductSuccess, setEditProductSuccess] = useState(false);

  const handleEditProduct = async (data, productId) => {
    console.log("data", data);
    console.log("productId", productId);

    const token = localStorage.getItem("token");
    setEditProductLoading(true);
    setEditProductError(null);

    try {
      const formData = new FormData();

      // Add fields to formData only if they have values
      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      if (data.price) formData.append("price", data.price);
      if (data.stock) formData.append("stock", data.stock);
      if (data.category) formData.append("category", data.category);

      // Append each image file if images are provided
      if (data.images && data.images.length > 0) {
        for (const image of data.images) {
          formData.append("images", image);
        }
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/edit`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        setEditProductSuccess(true);
        dispatch(setProduct(result.product));

        setTimeout(() => {
          setEditProductSuccess(false);
        }, 3000);
      } else {
        setEditProductError(result.message || "Failed to edit product");
        setTimeout(() => {
          setEditProductError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error editing product:", error);
      setEditProductError("An error occurred. Please try again later.");
      setTimeout(() => {
        setEditProductError(null);
      }, 3000);
    } finally {
      setEditProductLoading(false);
    }
  };

  return {
    handleEditProduct,
    editProductLoading,
    editProductError,
    editProductSuccess,
  };
};

export default useEditProduct;

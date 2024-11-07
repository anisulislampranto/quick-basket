"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

const useAddProduct = () => {
  const { user } = useSelector((state) => state.user);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState(null);
  const [addProductSuccess, setAddProductSuccess] = useState(false);

  const handleAddProduct = async (data) => {
    const token = localStorage.getItem("token");
    setAddProductLoading(true);
    setAddProductError(null);

    console.log("dat", data);

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
        setAddProductSuccess(true);

        setTimeout(() => {
          setAddProductSuccess(false);
        }, 3000);
      } else {
        setAddProductError(result.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setAddProductError("An error occurred. Please try again later.");
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

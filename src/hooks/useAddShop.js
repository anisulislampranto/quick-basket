"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchMe } from "@/lib/features/user/userSlice";

const useAddShop = () => {
  const dispatch = useDispatch();
  const [addShopLoading, setAddShopLoading] = useState(false);
  const [addShopError, setAddShopError] = useState(null);
  const [addShopSuccess, setAddShopSuccess] = useState(false);

  const handleAddShop = async (data) => {
    const token = localStorage.getItem("quickBasketToken");
    setAddShopLoading(true);
    setAddShopError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("logo", data.logo[0]);
      formData.append("coverImage", data.coverImage[0]);
      formData.append("description", data.description);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shop/create`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const createdShop = await res.json();

      if (res.ok) {
        setAddShopSuccess(true);
        dispatch(fetchMe());
      } else {
        setAddShopError(createdShop.message || "Failed to create shop");
        setTimeout(() => {
          setAddShopError(null);
        }, 3000);
      }
    } catch (err) {
      setAddShopError("An error occurred");
      console.error(err);
      setTimeout(() => {
        setAddShopError(null);
      }, 3000);
    } finally {
      setAddShopLoading(false);
    }
  };

  return { handleAddShop, addShopLoading, addShopError, addShopSuccess };
};

export default useAddShop;

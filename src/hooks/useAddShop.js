"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const useAddShop = () => {
  const router = useRouter();
  const [addShopLoading, setAddShopLoading] = useState(false);
  const [addShopError, setAddShopError] = useState(null);

  const handleAddShop = async (data) => {
    const token = localStorage.getItem("token");
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
        router.reload(window.location.pathname);
      } else {
        setAddShopError(createdShop.message || "Failed to create shop");
      }
    } catch (err) {
      setAddShopError("An error occurred");
      console.error(err);
    } finally {
      setAddShopLoading(false);
    }
  };

  return { handleAddShop, addShopLoading, addShopError };
};

export default useAddShop;

export const getMe = async () => {
  const token = localStorage.getItem("quickBasketToken");

  let response;

  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getMe`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    response = await res.json();
  }

  return response;
};

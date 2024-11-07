export const getMe = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getMe`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return await response.json();
  }
};

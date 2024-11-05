import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useGoogleOAuthLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResponse = async (authResult) => {
    setLoading(true);
    setError(null);

    try {
      if (authResult.code) {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google?code=${authResult.code}`
        );
        const data = await result.json();

        console.log("data", data);

        if (result.ok) {
          console.log("data", data);

          // setUser({ token: data.token, ...data.user });
          //   router.push("/profile");
        } else {
          console.error("Failed to login with Google:", data);
          setError("Failed to log in with Google.");
        }
      } else {
        console.error("Google OAuth Error:", authResult);
        setError("Authentication error occurred with Google.");
      }
    } catch (error) {
      console.error("Error while handling Google login:", error);
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleResponse,
    onError: (error) => {
      console.error("Google OAuth Error:", error);
      setError("Google login failed. Please try again.");
    },
    flow: "auth-code",
  });

  return { googleLogin, loading, error };
};

export default useGoogleOAuthLogin;

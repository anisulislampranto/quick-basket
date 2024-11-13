import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import localFont from "next/font/local";
import { StoreProvider } from "@/lib/StoreProvider";
import HeaderClient from "@/components/global/Header";
import GlobalLoader from "@/utils/GlobalLoader";
import Footer from "@/components/global/Footer";

export const metadata = {
  title: "Quick Basket",
  description:
    "Quick Basket - Focuses on a fast, efficient shopping experience.",
};

const montserrat = localFont({
  src: "../../public/fonts/montserrat/Montserrat-Medium.ttf",
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat`}>
        <StoreProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            <GlobalLoader>
              <HeaderClient />
              {children}
              <Footer />
            </GlobalLoader>
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

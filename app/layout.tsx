import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/(Footer)/Footer";
import { FilterProvider } from "./utils/Providers/FilterProvider";
import { NavBar } from "./Components/(navBar)/NavBar";
import { CartProvider } from "./utils/Providers/StateContext";
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion App",
  description: "Fashion app with react js ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/" signInUrl="">
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <FilterProvider>
            <div className="container">
              <NavBar />
              {children}
              <Footer />
            </div>
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}

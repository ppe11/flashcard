import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Suspense} from 'react';




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Love At First Paw",
  description: "Find your purrfect pet today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
       <Navbar/>
       <Suspense fallback={<div>Loading...</div>}>
       <main className="flex-grow">{children}</main>
       </Suspense>
        <Footer/>
      </body>
    </html>
  );
}

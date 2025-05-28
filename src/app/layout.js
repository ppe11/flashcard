import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Suspense} from 'react';
import Head from 'next/head';




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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
       <Navbar/>
       <Suspense fallback={<div>Loading...</div>}>
       <main className="flex-grow">{children}</main>
       </Suspense>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/HomePages/Footer";
import SmoothScroll from "./Components/SmoothScroll";
import CustomCursor from "./Components/CustomCursor";
import FloatingContact from "./Components/Common/FloatingContact";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndepthStudio | Luxury Interior Design",
  description: "Award-winning interior design studio crafting timeless elegant spaces.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          {modal}
          <Footer />
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  );
}

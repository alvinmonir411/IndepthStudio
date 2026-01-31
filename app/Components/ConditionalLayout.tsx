"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./HomePages/Footer";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import FloatingContact from "./Common/FloatingContact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConditionalLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <CustomCursor />
                {children}
                {modal}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        );
    }

    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
            {modal}
            <Footer />
            <FloatingContact />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="dark"
            />
        </SmoothScroll>
    );
}

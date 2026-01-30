"use client"
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';


const Navbar = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/About" },
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "Review", href: "/Review" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='fixed top-6 left-0 right-0 z-50 px-4 md:px-8'>
            <nav className='container mx-auto bg-[#FDF8F3] rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between'>
                {/* Logo */}
                <Link href="/" className='relative block w-12 h-12 overflow-hidden rounded-full border border-stone-200'>
                    <Image
                        src="/Logo.jpeg"
                        alt="IndepthStudio Logo"
                        width={100}
                        height={100}
                        className="object-cover rounded-full"
                    />
                </Link>

                {/* Desktop Links */}
                <ul className='hidden md:flex items-center gap-8'>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className='text-[#5C4033] font-medium hover:text-[#8B4513] transition-colors text-sm tracking-wide'
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Contact Button */}
                <div className='flex items-center gap-4'>
                    <Link
                        href="/contact"
                        className="group bg-amber-600 rounded-full text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-amber-700 transition-all duration-300 flex items-center justify-center sm:justify-start">
                        Contact Us
                    </Link>

                    {/* Mobile Menu Toggle (Simplified) */}
                    <button className='md:hidden text-[#5C4033]'>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>
        </motion.div>
    );
};

export default Navbar;
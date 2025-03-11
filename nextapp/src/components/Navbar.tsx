"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            NextApp
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            {["Dashboard", "Users", "Room", "Bookings"].map((item, index) => (
              <Link key={index} href={`/${item.toLowerCase()}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
                {item}
              </Link>
            ))}
          </div>

          {/* Toggle Mobile Menu */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4"
        >
          <div className="flex flex-col space-y-4">
            {["Home", "About", "Room Management", "Bookings"].map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

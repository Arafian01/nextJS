"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isLoggedIn, setIdLoggedIn] = useState(false);

  const login = () => {
    setIdLoggedIn(true);
  };
  const logout = () => {
    setIdLoggedIn(false);
  };

  const user = {
    name: "Arafian Hafiz",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full bg-white shadow-md dark:bg-gray-900 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            NextApp
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6 items-left">
            {["Dashboard", "Users", "Room", "Bookings"].map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
              >
                {item}
              </Link>
            ))}

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <UserCircle size={24} />
                <span>{user.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded-md shadow-lg py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => alert("Logging out...")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
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
            {["Dashboard", "Users", "Room", "Bookings"].map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* Mobile Dropdown (optional) */}
            <hr className="border-gray-200 dark:border-gray-700" />
            <Link
              href="/profile"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                alert("Logging out...");
              }}
              className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

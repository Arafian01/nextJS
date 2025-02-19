"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="h-screen fixed bg-gray-900 text-white w-64 hidden md:block p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="flex items-center gap-3 hover:text-blue-400">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link href="/users" className="flex items-center gap-3 hover:text-blue-400">
          <Users size={20} /> Users
        </Link>
        <Link href="/settings" className="flex items-center gap-3 hover:text-blue-400">
          <Settings size={20} /> Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

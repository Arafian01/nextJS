"use client";

import { i } from "framer-motion/client";
import { useEffect, useState } from "react";
import TableComponent from "@app/components/TableComponent";

export default function Page() {
  const [total, setTotal] = useState(0);

  const tambah = () => {
    setTotal(total + Math.floor(Math.random() * 100));
  };

  useEffect(() => {
    tambah();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto bg-white px-8">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <TableComponent />
        </div>
    </div>
    
  );
}

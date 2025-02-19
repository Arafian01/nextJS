'use client';

import { i } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function Page() {
    const [total, setTotal] = useState(0)
    
    const tambah = () => {
        setTotal(total + Math.floor(Math.random() * 100))
    }

    useEffect(() => {
        tambah()
    }, [])
    
    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1>{total}</h1>
            <button className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-semibold" onClick={tambah}>
                Click Button
            </button>
        </div>
    );
}
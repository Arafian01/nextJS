// src/app/dashboard/page.tsx
"use client";
import Navbar from "@app/components/Navbar";
import { useState } from "react";

// Type definitions
type DataType = {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DataType[]>([
    {
      id: 1,
      name: "Auditorium Utama",
      capacity: 300,
      category: "Auditorium",
      price: "Rp. 3.500.000",
      status: "APPROVED",
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  const handleApprove = (id: number) => {
    console.log("Approve item:", id);
  };

  const handleReject = (id: number) => {
    console.log("Reject item:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-8">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="min-h-screen bg-gray-100">
          <div className="p-4 md:p-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <form onSubmit={handleSearch} className="mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Type for search then enter"
                  className="w-full md:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Add New
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "NO",
                      "NAME",
                      "CAPACITY",
                      "CATEGORY",
                      "PRICE",
                      "STATUS",
                      "ACTION",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        {item.status === "PENDING" ? (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

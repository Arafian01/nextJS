// pages/room-management.tsx
"use client";
import { useState } from "react";

type Room = {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: number;
  status: "approved" | "rejected" | "pending";
};

const RoomManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: "Auditorium Utama",
      capacity: 300,
      category: "Auditorium",
      price: 3500000,
      status: "pending",
    },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: number, newStatus: "approved" | "rejected") => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-9">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-7xl h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add New
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-white dark:bg-gray-800 ">
              <tr className="bg-white border-t border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th className="px-6 py-3 text-center">NO</th>
                <th className="px-6 py-3 text-center">NAME</th>
                <th className="px-6 py-3 text-center">CAPACITY</th>
                <th className="px-6 py-3 text-center">CATEGORY</th>
                <th className="px-6 py-3 text-center">PRICE</th>
                <th className="px-6 py-3 text-center">STATUS</th>
                <th className="px-6 py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room, index) => (
                <tr key={room.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{room.name}</td>
                  <td className="px-4 py-2 text-center">{room.capacity}</td>
                  <td className="px-4 py-2 text-center">{room.category}</td>
                  <td className="px-4 py-2 text-center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(room.price)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        room.status === "approved"
                          ? "bg-green-500"
                          : room.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {room.status.charAt(0).toUpperCase() +
                        room.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="">
                      <button
                        onClick={() => toggleStatus(room.id, "approved")}
                        className="focus:outline-none text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => toggleStatus(room.id, "rejected")}
                        className="focus:outline-none text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Reject
                      </button>
                    </div>
                    <div className="">
                      <button className="focus:outline-none text-gray-50 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        Edit
                      </button>
                      <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;

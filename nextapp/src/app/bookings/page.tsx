// pages/bookings.tsx
"use client";
import { useState } from "react";

type Booking = {
  id: number;
  room: string;
  bookingDate: Date;
  bookedBy: string;
  price: number;
};

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      room: "Auditorium Utama",
      bookingDate: new Date("2025-06-13"),
      bookedBy: "Rouasd",
      price: 3500000,
    },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingDate.toDateString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-9">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-7xl h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search bookings..."
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
                <th className="px-6 py-3 text-center">Room</th>
                <th className="px-6 py-3 text-center">Booking Date</th>
                <th className="px-6 py-3 text-center">Booked By</th>
                <th className="px-6 py-3 text-center">Price</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{booking.room}</td>
                  <td className="px-4 py-2 text-center">
                    {new Intl.DateTimeFormat("id-ID").format(
                      booking.bookingDate
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">{booking.bookedBy}</td>
                  <td className="px-4 py-2 text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(booking.price)}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button className="focus:outline-none text-gray-50 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                      Edit
                    </button>
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Delete
                    </button>
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

export default Bookings;

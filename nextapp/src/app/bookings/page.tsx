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
      bookedBy: "Rouasd Team",
      price: 3500000,
    },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => 
    booking.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.bookedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.bookingDate.toDateString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Booking Date</th>
                <th className="px-4 py-2">Booked By</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking.id} className="border-t">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{booking.room}</td>
                  <td className="px-4 py-2 text-center">
                    {new Intl.DateTimeFormat('id-ID').format(booking.bookingDate)}
                  </td>
                  <td className="px-4 py-2 text-center">{booking.bookedBy}</td>
                  <td className="px-4 py-2 text-right">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(booking.price)}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
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
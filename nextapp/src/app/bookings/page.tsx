"use client";
import { useState, useEffect } from "react";

type Booking = {
  id: number;
  roomId: number; // ID ruangan yang dipesan
  bookingDate: string; // Format YYYY-MM-DD, sesuai dengan input type date
  bookedBy: number; // ID user yang memesan
  price: number;
};

const BookingManagement = () => {
  // State utama
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State modal untuk tambah & edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialModalBooking: Booking = {
    id: 0,
    roomId: 0,
    bookingDate: "",
    bookedBy: 0,
    price: 0,
  };
  const [modalBooking, setModalBooking] = useState<Booking>(initialModalBooking);

  // Modal helper functions
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const actionModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Ambil data dummy dari bookings.json
  useEffect(() => {
    fetch("/bookings.json")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Reset halaman ke 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fungsi search (mencari di semua field)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      booking.id.toString().includes(searchLower) ||
      booking.roomId.toString().includes(searchLower) ||
      booking.bookingDate.toLowerCase().includes(searchLower) ||
      booking.bookedBy.toString().includes(searchLower) ||
      booking.price.toString().includes(searchLower)
    );
  });

  // Fungsi sorting berdasarkan field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof Booking];
    const bValue = b[sortField as keyof Booking];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // Fungsi CRUD: Tambah atau Edit Booking melalui modal
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) {
      // Edit: Update data booking
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === modalBooking.id ? modalBooking : booking
        )
      );
    } else {
      // Tambah: Buat ID baru dan tambahkan booking
      const newId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
      setBookings((prev) => [...prev, { ...modalBooking, id: newId }]);
    }
    closeModal();
    setModalBooking(initialModalBooking);
  };

  // Fungsi delete booking dengan konfirmasi
  const handleDeleteBooking = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    }
  };

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
          <button
            onClick={() => {
              setModalBooking(initialModalBooking);
              setIsEditMode(false);
              openModal();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add New
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-white">
              <tr className="bg-white border-t border-b hover:bg-gray-50">
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-3 text-center cursor-pointer select-none"
                >
                  ID {renderSortIndicator("id")}
                </th>
                <th
                  onClick={() => handleSort("roomId")}
                  className="px-6 py-3 text-center cursor-pointer select-none"
                >
                  Room ID {renderSortIndicator("roomId")}
                </th>
                <th
                  onClick={() => handleSort("bookingDate")}
                  className="px-6 py-3 text-center cursor-pointer select-none"
                >
                  Booking Date {renderSortIndicator("bookingDate")}
                </th>
                <th
                  onClick={() => handleSort("bookedBy")}
                  className="px-6 py-3 text-center cursor-pointer select-none"
                >
                  Booked By {renderSortIndicator("bookedBy")}
                </th>
                <th
                  onClick={() => handleSort("price")}
                  className="px-6 py-3 text-center cursor-pointer select-none"
                >
                  Price {renderSortIndicator("price")}
                </th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-center">{booking.id}</td>
                  <td className="px-4 py-2 text-center">{booking.roomId}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(booking.bookingDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-2 text-center">{booking.bookedBy}</td>
                  <td className="px-4 py-2 text-center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(booking.price)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => {
                          setModalBooking(booking);
                          setIsEditMode(true);
                          openModal();
                        }}
                        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Section untuk Tambah/Edit Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit Booking" : "Add New Booking"}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Room ID</label>
                <input
                  type="number"
                  value={modalBooking.roomId}
                  onChange={(e) =>
                    setModalBooking({
                      ...modalBooking,
                      roomId: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Booking Date</label>
                <input
                  type="date"
                  value={modalBooking.bookingDate}
                  onChange={(e) =>
                    setModalBooking({
                      ...modalBooking,
                      bookingDate: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Booked By (User ID)</label>
                <input
                  type="number"
                  value={modalBooking.bookedBy}
                  onChange={(e) =>
                    setModalBooking({
                      ...modalBooking,
                      bookedBy: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={modalBooking.price}
                  onChange={(e) =>
                    setModalBooking({
                      ...modalBooking,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isEditMode ? "Save Changes" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;

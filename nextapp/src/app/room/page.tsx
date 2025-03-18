"use client";
import { useState, useEffect } from "react";

type Room = {
  id: number;
  name: string;
  capacity: number;
  category: "kelas" | "labolatorium" | "perpustakaan" | "auditorium" | "lainnya";
  price: number;
  status: string;
};

const RoomManagement = () => {
  // State data dan modal
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State modal (untuk tambah & edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialModalRoom: Room = {
    id: 0,
    name: "",
    capacity: 0,
    category: "kelas",
    price: 0,
    status: "available",
  };
  const [modalRoom, setModalRoom] = useState<Room>(initialModalRoom);

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

  // Ambil data dummy dari rooms.json
  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  // Reset halaman ke 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fungsi search berdasarkan semua field
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRooms = rooms.filter((room) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      room.id.toString().includes(searchLower) ||
      room.name.toLowerCase().includes(searchLower) ||
      room.capacity.toString().includes(searchLower) ||
      room.category.toLowerCase().includes(searchLower) ||
      room.price.toString().includes(searchLower) ||
      room.status.toLowerCase().includes(searchLower)
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

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof Room];
    const bValue = b[sortField as keyof Room];

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
  const currentRooms = sortedRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);

  // Render indikator sort pada header
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // Fungsi untuk toggle status (tetap ada sebagai contoh)
  const toggleStatus = (id: number, newStatus: "approved" | "rejected") => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  // CRUD: Tambah atau Edit Room melalui modal
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) {
      // Edit: Update data room
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === modalRoom.id ? modalRoom : room
        )
      );
    } else {
      // Tambah: Generate id baru, dan tambahkan room baru
      const newId =
        rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;
      setRooms((prevRooms) => [
        ...prevRooms,
        { ...modalRoom, id: newId },
      ]);
    }
    closeModal();
    setModalRoom(initialModalRoom);
  };

  // Fungsi delete room dengan konfirmasi
  const handleDeleteRoom = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus room ini?")) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    }
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
          <button
            onClick={() => {
              setModalRoom(initialModalRoom);
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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-white dark:bg-gray-800">
              <tr className="bg-white border-t border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("id")}
                >
                  NO{renderSortIndicator("id")}
                </th>
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  NAME{renderSortIndicator("name")}
                </th>
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("capacity")}
                >
                  CAPACITY{renderSortIndicator("capacity")}
                </th>
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("category")}
                >
                  CATEGORY{renderSortIndicator("category")}
                </th>
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("price")}
                >
                  PRICE{renderSortIndicator("price")}
                </th>
                <th
                  className="px-6 py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort("status")}
                >
                  STATUS{renderSortIndicator("status")}
                </th>
                <th className="px-6 py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr
                  key={room.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 text-center">{room.id}</td>
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
                    <div className="flex flex-col space-y-1">
                      <div>
                        <button
                          onClick={() => {
                            setModalRoom(room);
                            setIsEditMode(true);
                            openModal();
                          }}
                          className="focus:outline-none text-gray-50 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5"
                        >
                          Delete
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => toggleStatus(room.id, "approved")}
                          className="focus:outline-none text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => toggleStatus(room.id, "rejected")}
                          className="focus:outline-none text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5"
                        >
                          Reject
                        </button>
                      </div>
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

      {/* Modal Section untuk Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit Room" : "Tambah Room"}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={modalRoom.name}
                  onChange={(e) =>
                    setModalRoom({ ...modalRoom, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  value={modalRoom.capacity}
                  onChange={(e) =>
                    setModalRoom({
                      ...modalRoom,
                      capacity: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={modalRoom.category}
                  onChange={(e) =>
                    setModalRoom({
                      ...modalRoom,
                      category: e.target.value as Room["category"],
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="kelas">Kelas</option>
                  <option value="labolatorium">Labolatorium</option>
                  <option value="perpustakaan">Perpustakaan</option>
                  <option value="auditorium">Auditorium</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={modalRoom.price}
                  onChange={(e) =>
                    setModalRoom({
                      ...modalRoom,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={modalRoom.status}
                  onChange={(e) =>
                    setModalRoom({
                      ...modalRoom,
                      status: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="available">Available</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isEditMode ? "Simpan Perubahan" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;

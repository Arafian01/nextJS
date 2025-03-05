// src/components/TableComponent.tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const TableComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal tambah
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal edit
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal hapus
  const [userToDelete, setUserToDelete] = useState<number | null>(null); // ID user yang akan dihapus

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 5; // Jumlah item per halaman

  // Fetch data from public/users.json
  useEffect(() => {
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Handle search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle add user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const updatedUsers = [...users, { id: newId, ...newUser }];
      setUsers(updatedUsers);
      setNewUser({ name: '', email: '' });
      setIsAddModalOpen(false); // Tutup modal tambah
    }
  };

  // Handle edit user
  const handleEditUser = () => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setIsEditModalOpen(false); // Tutup modal edit
    }
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (userToDelete !== null) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);
      setUserToDelete(null);
      setIsDeleteModalOpen(false); // Tutup modal hapus
    }
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Tombol Tambah Data */}
      <button
        onClick={() => setIsAddModalOpen(true)} // Buka modal tambah
        className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
      >
        Tambah Data
      </button>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id} className="border">
              {/* Nomor urut dimulai dari 1 di setiap halaman */}
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setUserToDelete(user.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= filteredUsers.length}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Tambah */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Pengguna</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)} // Tutup modal
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleAddUser} // Tambah pengguna
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Pengguna</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)} // Tutup modal
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleEditUser} // Simpan perubahan
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus pengguna ini?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)} // Tutup modal
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteUser} // Hapus pengguna
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
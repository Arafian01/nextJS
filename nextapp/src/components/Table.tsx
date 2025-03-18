const Table = () => {
    return (
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">data Transaksi</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Harga</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3">John Doe</td>
              <td className="py-2 px-3">Rp 500.000</td>
              <td className="py-2 px-3 text-green-500">Completed</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Jane Smith</td>
              <td className="py-2 px-3">Rp 100.000</td>
              <td className="py-2 px-3 text-yellow-500">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  
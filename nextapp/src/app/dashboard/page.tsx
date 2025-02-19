import Sidebar from "@app/components/Sidebar2";
import Topbar from "@app/components/Topbar";
import Card from "@app/components/Card";
import Table from "@app/components/Table";
import { Users, DollarSign, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-64">
        {/* Topbar */}
        <Topbar />

        <main className="p-6 bg-gray-100 min-h-screen">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card title="Users" value="1,200" icon={<Users size={24} />} />
            <Card title="Revenue" value="$25,000" icon={<DollarSign size={24} />} />
            <Card title="Orders" value="350" icon={<ShoppingCart size={24} />} />
          </div>

          {/* Table */}
          <Table />
        </main>
      </div>
    </div>
  );
}

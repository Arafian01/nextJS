"use client";

import Sidebar from "@app/components/Sidebar2";
import Topbar from "@app/components/Topbar";
import Card from "@app/components/Card";
import Table from "@app/components/Table";
import { Users, DollarSign, ShoppingCart } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", users: 400, revenue: 2400, orders: 240 },
  { month: "Feb", users: 300, revenue: 1398, orders: 221 },
  { month: "Mar", users: 500, revenue: 9800, orders: 229 },
  { month: "Apr", users: 278, revenue: 3908, orders: 200 },
  { month: "May", users: 189, revenue: 4800, orders: 218 },
  { month: "Jun", users: 239, revenue: 3800, orders: 250 },
  { month: "Jul", users: 349, revenue: 4300, orders: 210 },
];

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Bagian Konten */}
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

          {/* Chart */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Monthly Overview
            </h2>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                  <Bar dataKey="orders" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <Table />
        </main>
      </div>
    </div>
  );
}

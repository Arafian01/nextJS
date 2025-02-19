import Image from "next/image";

const Topbar = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-3">
        <Image src="/avatar.png" alt="User Avatar" width={40} height={40} className="rounded-full" />
      </div>
    </header>
  );
};

export default Topbar;

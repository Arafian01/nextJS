import { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const Card = ({ title, value, icon }: CardProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
      <div className="p-3 bg-blue-500 text-white rounded-full">{icon}</div>
      <div>
        <h3 className="text-gray-600">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;

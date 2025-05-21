import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-3 text-gray-800 dark:text-gray-200">
        <div className="mr-2 text-blue-500">{icon}</div>
        <h4 className="font-medium">{title}</h4>
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
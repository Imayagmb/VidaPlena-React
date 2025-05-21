import React from 'react';

interface ProgressoProps {
  progresso: number; // 0-100
  color?: string;
}

const Progresso: React.FC<ProgressoProps> = ({ 
  progresso, 
  color = 'bg-blue-500'
}) => {
  // Progresso de 0 a 100
  const safeProgress = Math.min(Math.max(progresso, 0), 100);
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        className={`${color} h-2 rounded-full transition-all duration-300 ease-in-out`} 
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
};

export default Progresso;
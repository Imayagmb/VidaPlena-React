import React from 'react';
import { Bell, User, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, darkMode }) => {
  return (
    <header className="p-4 md:p-6 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Viva uma vida plena
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { 
  Heart, 
  Home, 
  Flag, 
  Utensils, 
  HeartPulse, 
  Users, 
  Settings, 
  ListTodo, 
  Wallet, 
  Clock 
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: <Home /> },
    { id: 'metas', label: 'Metas', icon: <Flag /> },
    { id: 'alimentacao', label: 'Alimentação', icon: <Utensils /> },
    { id: 'historico', label: 'Histórico Médico', icon: <HeartPulse /> },
    { id: 'contatos', label: 'Contatos de Emergência', icon: <Users /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings /> },
    { id: 'tarefas', label: 'Lista de Tarefas', icon: <ListTodo /> },
    { id: 'financas', label: 'Finanças', icon: <Wallet /> },
    { id: 'projetos', label: 'Gerenciar Projetos', icon: <Clock /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 w-full md:w-64 md:min-h-screen p-4 border-r dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-8">
        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
        <span className="text-xl font-bold text-gray-800 dark:text-white">VidaPlena</span>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActivePage(item.id)}
              className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
                activePage === item.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
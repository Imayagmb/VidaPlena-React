import React from 'react';
import { Bell, Palette } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleTheme }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Configurações</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receba alertas importantes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">E-mails</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receba relatórios semanais
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sons</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sons de notificação
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Aparência</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Modo Escuro</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Alterar tema do aplicativo
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={toggleTheme}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {/* Text Size Setting */}
            <div>
              <h4 className="font-medium mb-2">Tamanho do Texto</h4>
              <div className="flex items-center justify-between space-x-2">
                <span className="text-sm">A</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  defaultValue="2"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-lg">A</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <h3 className="text-xl font-semibold mb-4">Conta</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome de Usuário
              </label>
              <input
                type="text"
                defaultValue="betina92"
                className="form-input"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="betina@example.com"
                className="form-input"
              />
            </div>
            
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
              Atualizar Perfil
            </button>
          </div>
        </div>
        
        {/* Data & Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          <h3 className="text-xl font-semibold mb-4">Dados & Privacidade</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Backup Automático</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manter seus dados salvos na nuvem
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-md font-medium">
              Exportar Dados
            </button>
            
            <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-md font-medium">
              Excluir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
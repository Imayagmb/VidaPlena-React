import React from 'react';
import { UserRound, Heart, Pill, Activity } from 'lucide-react';

const MedicalHistory: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Histórico Médico</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="p-4 md:p-6">
          <div className="flex items-center mb-4">
            <UserRound className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Dados Pessoais</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome Completo
              </label>
              <input 
                type="text" 
                value="Betina Barbosa" 
                disabled 
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 text-gray-800 dark:text-gray-200"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data de Nascimento
                </label>
                <input 
                  type="date" 
                  value="1992-01-01" 
                  disabled 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 text-gray-800 dark:text-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo Sanguíneo
                </label>
                <input 
                  type="text" 
                  value="A+" 
                  disabled 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sexo
              </label>
              <input 
                type="text" 
                value="Feminino" 
                disabled 
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Condições Médicas</h3>
          </div>
          
          <div className="mb-6">
            <textarea 
              value="Hipertensão controlada" 
              disabled
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 min-h-[80px] text-gray-800 dark:text-gray-200"
            ></textarea>
          </div>
          
          <div className="flex items-center mb-4">
            <Pill className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Alergias</h3>
          </div>
          
          <div className="mb-6">
            <textarea 
              value="Penicilina" 
              disabled
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 min-h-[80px] text-gray-800 dark:text-gray-200"
            ></textarea>
          </div>
          
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Cirurgias Anteriores</h3>
          </div>
          
          <div>
            <textarea 
              value="Remoção de projétil (1995)" 
              disabled
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 min-h-[80px] text-gray-800 dark:text-gray-200"
            ></textarea>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-b-lg border-t border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Nota:</strong> Para atualizar seus dados médicos, por favor entre em contato com seu médico ou clínica de saúde.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
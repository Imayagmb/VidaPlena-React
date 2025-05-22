import React from 'react';
import Progresso from '../components/progresso/progresso';
import DashboardCard from '../components/dashboardCard/DashboardCard';
import { Award, Utensils, HeartPulse } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Banner Bem-vindo */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 mb-6 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo(a) ao seu planejamento de vida</h2>
          <div className="flex items-center mt-2">
            <div>
              <h3 className="text-xl font-semibold">Olá, Betina</h3>
              <p className="text-blue-100">Organize sua vida de forma simples e eficiente.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Diário */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Resumo do Dia</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard 
          title="Metas Diárias" 
          icon={<Award className="h-5 w-5" />}
        >
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Passos</span>
                <span>5000/10000</span>
              </div>
              <Progresso progresso={50} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Água</span>
                <span>1.5L/2L</span>
              </div>
              <Progresso progresso={75} />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard 
          title="Alimentação de Hoje" 
          icon={<Utensils className="h-5 w-5" />}
        >
          <div className="mt-2 space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Café da Manhã</span>
              <p className="text-sm">Pão integral, ovos e café</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Almoço</span>
              <p className="text-sm">Arroz, feijão e frango grelhado</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard 
          title="Status de Saúde" 
          icon={<HeartPulse className="h-5 w-5" />}
        >
          <div className="mt-2 space-y-3">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                <HeartPulse className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Batimentos</span>
                <p className="text-sm">72 bpm</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <HeartPulse className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sono</span>
                <p className="text-sm">7h30min</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
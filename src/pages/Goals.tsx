import React, { useState } from 'react';
import { Footprints, Droplet, Moon } from 'lucide-react';

interface GoalCategory {
  id: string;
  title: string;
  goals: Goal[];
}

interface Goal {
  id: string;
  description: string;
  completed: boolean;
}

const Goals: React.FC = () => {
  // Estado das metas diárias de saúde
  const [healthGoals, setHealthGoals] = useState({
    steps: { target: 10000, current: 5000 },
    water: { target: 2000, current: 1500 },
    sleep: { target: 8, current: 7 },
  });

  // Objetivos de vida por categoria
  const [categories, setCategories] = useState<GoalCategory[]>([
    { 
      id: 'daily', 
      title: 'Diárias', 
      goals: [
        { id: '1', description: 'Meditar por 10 minutos', completed: false },
        { id: '2', description: 'Ler 20 páginas', completed: true },
      ],
    },
    { 
      id: 'weekly', 
      title: 'Semanais', 
      goals: [
        { id: '3', description: 'Fazer exercícios 3x', completed: false },
        { id: '4', description: 'Ligar para a família', completed: false },
      ],
    },
    { 
      id: 'monthly', 
      title: 'Mensais', 
      goals: [
        { id: '5', description: 'Revisar orçamento', completed: true },
      ],
    },
    { 
      id: 'yearly', 
      title: 'Anuais', 
      goals: [
        { id: '6', description: 'Viajar para um novo lugar', completed: false },
      ],
    },
  ]);

  // Gerenciar formulário de nova meta
  const [newGoalText, setNewGoalText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('daily');

  const addGoal = (categoryId: string) => {
    if (!newGoalText.trim()) return;
    
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          goals: [
            ...category.goals,
            {
              id: Date.now().toString(),
              description: newGoalText,
              completed: false
            }
          ]
        };
      }
      return category;
    }));
    
    setNewGoalText('');
  };

  const toggleGoalComplete = (categoryId: string, goalId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          goals: category.goals.map(goal => {
            if (goal.id === goalId) {
              return { ...goal, completed: !goal.completed };
            }
            return goal;
          })
        };
      }
      return category;
    }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Metas</h2>
      
      {/* Cards metas de vida */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Footprints className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Passos Diários</h3>
          </div>
          <p className="text-lg font-medium mb-2">
            {healthGoals.steps.current.toLocaleString()} / {healthGoals.steps.target.toLocaleString()}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${(healthGoals.steps.current / healthGoals.steps.target) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Droplet className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Água (ml)</h3>
          </div>
          <p className="text-lg font-medium mb-2">
            {healthGoals.water.current} / {healthGoals.water.target}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${(healthGoals.water.current / healthGoals.water.target) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Moon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Sono (horas)</h3>
          </div>
          <p className="text-lg font-medium mb-2">
            {healthGoals.sleep.current} / {healthGoals.sleep.target}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${(healthGoals.sleep.current / healthGoals.sleep.target) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Metas de vida */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Metas da Vida</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium mb-3">{category.title}</h4>
              
              <ul className="space-y-2 mb-4">
                {category.goals.map(goal => (
                  <li key={goal.id} className="flex items-start">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoalComplete(category.id, goal.id)}
                      className="mt-1 mr-2"
                    />
                    <span className={goal.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                      {goal.description}
                    </span>
                  </li>
                ))}
                {category.goals.length === 0 && (
                  <li className="text-gray-500 dark:text-gray-400 text-sm italic">Nenhuma meta adicionada</li>
                )}
              </ul>
              
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Nova meta..."
                  value={selectedCategory === category.id ? newGoalText : ''}
                  onChange={(e) => {
                    setSelectedCategory(category.id);
                    setNewGoalText(e.target.value);
                  }}
                  className="form-input text-sm mb-2"
                />
                <button 
                  onClick={() => addGoal(category.id)}
                  className="w-full text-sm py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  + Adicionar Meta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
import React, { useState, useEffect } from 'react';
import { Coffee, UtensilsCrossed, Apple, Moon } from 'lucide-react';

interface MealEntry {
  id: string;
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  content: string;
  time?: string;
}

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<MealEntry[]>(() => {
    const savedMeals = localStorage.getItem('meals');
    return savedMeals ? JSON.parse(savedMeals) : [
      { id: '1', type: 'breakfast', content: 'Pão integral, ovos e café' },
      { id: '2', type: 'lunch', content: 'Arroz, feijão e frango grelhado' },
      { id: '3', type: 'snack', content: '' },
      { id: '4', type: 'dinner', content: '' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const updateMeal = (type: MealEntry['type'], content: string) => {
    setMeals(meals.map(meal => 
      meal.type === type ? { ...meal, content } : meal
    ));
  };

  const saveMeals = () => {
    localStorage.setItem('meals', JSON.stringify(meals));
    // Exibir notificação
    alert('Registro alimentar salvo com sucesso!');
  };

  // ícone da refeição
  const getMealIcon = (type: MealEntry['type']) => {
    switch (type) {
      case 'breakfast': return <Coffee className="h-5 w-5" />;
      case 'lunch': return <UtensilsCrossed className="h-5 w-5" />;
      case 'snack': return <Apple className="h-5 w-5" />;
      case 'dinner': return <Moon className="h-5 w-5" />;
    }
  };

  // Função para obter o nome da refeição
  const getMealTitle = (type: MealEntry['type']) => {
    switch (type) {
      case 'breakfast': return 'Café da Manhã';
      case 'lunch': return 'Almoço';
      case 'snack': return 'Lanche';
      case 'dinner': return 'Jantar';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Registro Alimentar</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map(meal => (
            <div key={meal.id} className="mb-4">
              <div className="flex items-center mb-2">
                <div className="text-blue-500 mr-2">{getMealIcon(meal.type)}</div>
                <h3 className="text-lg font-medium">{getMealTitle(meal.type)}</h3>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                  p-3 text-gray-800 dark:text-gray-100 min-h-[100px]
                  focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Digite seus alimentos..."
                value={meal.content}
                onChange={(e) => updateMeal(meal.type, e.target.value)}
              ></textarea>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={saveMeals}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
          >
            Salvar Registro
          </button>
        </div>
      </div>
      
      {/* Dicas de alimentação */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Dicas de Alimentação Saudável</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-2">Hidratação</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lembre-se de beber pelo menos 2 litros de água por dia para manter-se hidratado.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-2">Vegetais Coloridos</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inclua vegetais de diferentes cores no seu prato para garantir uma variedade de nutrientes.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-2">Proteínas</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inclua fontes de proteínas em todas as refeições para manter a saciedade por mais tempo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
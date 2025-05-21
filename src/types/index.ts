// Definições de tipos para o app VidaPlena

// Para TaskList
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Para Metas
export interface Goal {
  id: string;
  description: string;
  completed: boolean;
}

export interface GoalCategory {
  id: string;
  title: string;
  goals: Goal[];
}

export interface HealthGoal {
  target: number;
  current: number;
}

export interface HealthGoals {
  steps: HealthGoal;
  water: HealthGoal;
  sleep: HealthGoal;
}

// Para Finanças

export interface Transaction {
  id: string;
  type: 'receita' | 'despesa';
  amount: number;
  description: string;
  date: number;
}

// Para Nutrição
export interface MealEntry {
  id: string;
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  content: string;
  time?: string;
}

// Para Projetos
export interface ProjectTask {
  id: string;
  name: string;
  estimatedTime: number; // em minutos

  startDate: string;
  completed: boolean;
  timeSpent: number; // em segundos

}

// Para Contatos de Emergência
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}
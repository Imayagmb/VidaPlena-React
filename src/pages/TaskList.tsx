import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trash, Plus } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTaskText, setNewTaskText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTaskText.trim()) {
      setError('Por favor, adicione um texto para a tarefa.');
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setError('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Lista de Tarefas</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
        <form onSubmit={addTask} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => {
                setNewTaskText(e.target.value);
                if (error) setError('');
              }}
              placeholder="Adicionar nova tarefa..."
              maxLength={100}
              className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                px-3 py-2 text-gray-800 dark:text-gray-100
                focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
        
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <CheckCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma tarefa adicionada ainda
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Adicione suas tarefas para começar a acompanhar seu progresso
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li 
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-md ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30' 
                    : 'bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`mr-3 ${
                      task.completed ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {task.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <span className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Excluir tarefa"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
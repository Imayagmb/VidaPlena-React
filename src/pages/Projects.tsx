import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, PlusCircle, Clock, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  estimatedTime?: string; // Made optional and changed to string to allow any format
  startDate: string;
  completed: boolean;
  timeSpent: number; // in seconds
}

const Projects: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('projectTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState({
    name: '',
    estimatedTime: '',
    startDate: '',
  });
  
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0); // in seconds
  const [totalTimeToday, setTotalTimeToday] = useState(0); // in seconds
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem('projectTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedTotalTime = localStorage.getItem(`totalTime_${today}`);
    if (savedTotalTime) {
      setTotalTimeToday(parseInt(savedTotalTime, 10));
    } else {
      setTotalTimeToday(0);
    }
  }, []);

  useEffect(() => {
    if (timerRunning && activeTask) {
      timerRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        setTotalTimeToday(prevTotal => prevTotal + 1);
        
        const today = new Date().toDateString();
        localStorage.setItem(`totalTime_${today}`, (totalTimeToday + 1).toString());
        
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === activeTask.id 
              ? { ...task, timeSpent: (task.timeSpent || 0) + 1 } 
              : task
          )
        );
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning, activeTask, totalTimeToday]);

  const startTimer = (task: Task) => {
    setActiveTask(task);
    setTimer(task.timeSpent || 0);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimer(0);
    setActiveTask(null);
  };

  const addTask = () => {
    if (!newTask.name || !newTask.startDate) {
      alert('Por favor, preencha o nome da tarefa e a data de início');
      return;
    }
    
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      estimatedTime: newTask.estimatedTime || undefined,
      startDate: newTask.startDate,
      completed: false,
      timeSpent: 0,
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      name: '',
      estimatedTime: '',
      startDate: '',
    });
  };

  const deleteTask = (id: string) => {
    if (activeTask && activeTask.id === id) {
      stopTimer();
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markTaskAsCompleted = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    if (activeTask && activeTask.id === id) {
      stopTimer();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Gerenciador de Projetos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tarefa Atual</h3>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-mono font-bold text-gray-800 dark:text-gray-200 mb-4">
                {formatTime(timer)}
              </div>
              
              {activeTask ? (
                <p className="mb-2 text-gray-600 dark:text-gray-400">{activeTask.name}</p>
              ) : (
                <p className="mb-2 text-gray-500 dark:text-gray-400 italic">Nenhuma tarefa selecionada</p>
              )}
              
              <div className="flex items-center justify-center space-x-3 mt-4">
                {!timerRunning ? (
                  <button
                    onClick={() => activeTask && startTimer(activeTask)}
                    disabled={!activeTask}
                    className={`p-2 rounded-full ${
                      activeTask 
                        ? 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    }`}
                    aria-label="Iniciar"
                  >
                    <Play className="h-8 w-8" />
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-400"
                    aria-label="Pausar"
                  >
                    <Pause className="h-8 w-8" />
                  </button>
                )}
                
                <button
                  onClick={stopTimer}
                  disabled={!activeTask}
                  className={`p-2 rounded-full ${
                    activeTask 
                      ? 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  }`}
                  aria-label="Parar"
                >
                  <Square className="h-8 w-8" />
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 text-center">
              <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Tempo Total Hoje</h4>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {formatTotalTime(totalTimeToday)}
              </p>
            </div>
          </div>
        </div>
        
        {/* New Task Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nova Tarefa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome da Tarefa
                </label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                  placeholder="Nome da tarefa"
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tempo Estimado (opcional)
                </label>
                <input
                  type="text"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({...newTask, estimatedTime: e.target.value})}
                  placeholder="Ex: 2h 30min, 45min, etc"
                  className="form-input"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data de Início
                </label>
                <input
                  type="datetime-local"
                  value={newTask.startDate}
                  onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={addTask}
                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar Tarefa
              </button>
            </div>
          </div>
          
          {/* Tasks List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tarefas Pendentes</h3>
            
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <Clock className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma tarefa adicionada
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Adicione tarefas para começar a acompanhar seu tempo
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className={`border ${
                    task.completed 
                      ? 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  } rounded-lg p-4`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {task.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {task.estimatedTime && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Estimado: {task.estimatedTime}</span>
                            </div>
                          )}
                          
                          <div>
                            <span>Gasto: {formatTotalTime(task.timeSpent || 0)}</span>
                          </div>
                          
                          <div>
                            <span>Início: {new Date(task.startDate).toLocaleString('pt-BR', { 
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!task.completed && (
                          <button
                            onClick={() => {
                              if (activeTask && activeTask.id === task.id) {
                                pauseTimer();
                              } else {
                                startTimer(task);
                              }
                            }}
                            className={`p-1.5 rounded-full ${
                              activeTask && activeTask.id === task.id && timerRunning
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}
                            aria-label={activeTask && activeTask.id === task.id && timerRunning ? 'Pausar' : 'Iniciar'}
                          >
                            {activeTask && activeTask.id === task.id && timerRunning ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        
                        <button
                          onClick={() => markTaskAsCompleted(task.id)}
                          className={`p-1.5 rounded-full ${
                            task.completed
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                          aria-label={task.completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          aria-label="Excluir tarefa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
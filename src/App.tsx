import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Nutrition from './pages/Nutrition';
import MedicalHistory from './pages/MedicalHistory';
import EmergencyContacts from './pages/EmergencyContacts';
import Settings from './pages/Settings';
import TaskList from './pages/TaskList';
import Finances from './pages/Finances';
import Projects from './pages/Projects';

function App() {
  const [activePage, setActivePage] = useState('inicio');
  const [darkMode, setDarkMode] = useState(false);

// Inicializar o modo escuro a partir do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

// Atualizar o tema quando o darkMode mudar
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

// Controlar a troca de tema
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

// Renderizar o componente da página ativa

  const renderActivePage = () => {
    switch (activePage) {
      case 'inicio':
        return <Dashboard />;
      case 'metas':
        return <Goals />;
      case 'alimentacao':
        return <Nutrition />;
      case 'historico':
        return <MedicalHistory />;
      case 'contatos':
        return <EmergencyContacts />;
      case 'configuracoes':
        return <Settings darkMode={darkMode} toggleTheme={toggleTheme} />;
      case 'tarefas':
        return <TaskList />;
      case 'financas':
        return <Finances />;
      case 'projetos':
        return <Projects />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 flex flex-col">
          <Header toggleTheme={toggleTheme} darkMode={darkMode} />
          <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
            {renderActivePage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
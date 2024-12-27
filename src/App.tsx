import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { BottomNav } from './components/navigation/BottomNav';
import { AuthForm } from './components/auth/AuthForm';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { LogOut } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading, signOut } = useAuth();
  const {
    tasks,
    stats,
    handleAddTask,
    handleTaskComplete,
    handleUpdateEffort,
    handleUpdateImpact
  } = useTasks();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'tasks':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Tasks</h2>
            <TaskList
              tasks={tasks}
              onTaskComplete={handleTaskComplete}
              onUpdateEffort={handleUpdateEffort}
              onUpdateImpact={handleUpdateImpact}
            />
          </div>
        );
      case 'add':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
            <TaskForm onAddTask={handleAddTask} />
          </div>
        );
      case 'achievements':
        return <AchievementsScreen stats={stats} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-red-600">
            🎅 Santa's Task Tracker
          </h1>
          <button
            onClick={signOut}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="pt-16 pb-20">
        {renderScreen()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
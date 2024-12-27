import React from 'react';
import { Home, ListTodo, PlusCircle, Award } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'tasks', icon: ListTodo, label: 'Tasks' },
    { id: 'add', icon: PlusCircle, label: 'Add' },
    { id: 'achievements', icon: Award, label: 'Stats' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1
              ${activeTab === id ? 'text-red-600' : 'text-gray-500'}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
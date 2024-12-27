import React from 'react';
import { AutomationForm } from '../automation/AutomationForm';
import { AutomationList } from '../automation/AutomationList';
import { useAutomation } from '../../hooks/useAutomation';
import { Task } from '../../types';

interface AutomationScreenProps {
  onCreateTask: (task: Omit<Task, 'id'>) => void;
}

export function AutomationScreen({ onCreateTask }: AutomationScreenProps) {
  const { rules, addRule, toggleRule, deleteRule } = useAutomation(onCreateTask);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Task Automation</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Rules</h3>
          <AutomationList
            rules={rules}
            onToggleRule={toggleRule}
            onDeleteRule={deleteRule}
          />
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Create New Rule</h3>
          <AutomationForm onAddRule={addRule} />
        </section>
      </div>
    </div>
  );
}
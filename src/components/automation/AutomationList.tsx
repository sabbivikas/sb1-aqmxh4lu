import React from 'react';
import { AutomationRule } from '../../types';
import { Card } from '../ui/Card';
import { Toggle, Trash2, Clock } from 'lucide-react';

interface AutomationListProps {
  rules: AutomationRule[];
  onToggleRule: (ruleId: string) => void;
  onDeleteRule: (ruleId: string) => void;
}

export function AutomationList({ rules, onToggleRule, onDeleteRule }: AutomationListProps) {
  return (
    <div className="space-y-4">
      {rules.map(rule => (
        <Card key={rule.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{rule.name}</h3>
              <p className="text-gray-600 text-sm">{rule.taskTemplate.description}</p>
              {rule.schedule && (
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    {rule.schedule.frequency}
                    {rule.schedule.day && ` (Day ${rule.schedule.day})`}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleRule(rule.id)}
                className={`p-2 rounded-full ${
                  rule.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Toggle className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteRule(rule.id)}
                className="p-2 rounded-full hover:bg-red-100 text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      ))}
      {rules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No automation rules yet! Create one to make task management easier.</p>
        </div>
      )}
    </div>
  );
}
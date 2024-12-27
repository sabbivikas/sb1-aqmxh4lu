import React, { useState } from 'react';
import { AutomationRule, Priority, Category } from '../../types';
import { Card } from '../ui/Card';
import { Clock, Calendar, Repeat } from 'lucide-react';

interface AutomationFormProps {
  onAddRule: (rule: Omit<AutomationRule, 'id'>) => void;
}

export function AutomationForm({ onAddRule }: AutomationFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'recurring' | 'suggestion'>('recurring');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [day, setDay] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState<Category>('Personal');
  const [goodDeedRating, setGoodDeedRating] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRule({
      name,
      type,
      schedule: {
        frequency,
        day: frequency === 'daily' ? undefined : day
      },
      taskTemplate: {
        description,
        priority,
        category,
        goodDeedRating
      },
      active: true
    });
    
    // Reset form
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="p-4">
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Automation Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          
          <div className="flex items-center space-x-3">
            <Clock className="text-gray-500" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'recurring' | 'suggestion')}
              className="flex-1 p-2 border rounded-lg"
            >
              <option value="recurring">Recurring Task</option>
              <option value="suggestion">Task Suggestion</option>
            </select>
          </div>

          {type === 'recurring' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-500" />
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
                  className="flex-1 p-2 border rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {frequency !== 'daily' && (
                <div className="flex items-center space-x-3">
                  <Repeat className="text-gray-500" />
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="flex-1 p-2 border rounded-lg"
                  >
                    {frequency === 'weekly' ? (
                      <>
                        <option value={0}>Sunday</option>
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                      </>
                    ) : (
                      Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Day {i + 1}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>
          )}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 border rounded-lg"
            required
          />
          
          {/* Reuse existing priority, category, and rating selectors from TaskForm */}
        </div>
      </Card>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 
          transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Create Automation Rule
      </button>
    </form>
  );
}
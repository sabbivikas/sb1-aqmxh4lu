import React, { useState } from 'react';
import { Star, Calendar, Flag, Tag, Sparkles } from 'lucide-react';
import { Priority, Category, Task } from '../types';
import { Card } from './ui/Card';
import { toLocalISOString } from '../utils/dateUtils';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(toLocalISOString(new Date()));
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState<Category>('Personal');
  const [goodDeedRating, setGoodDeedRating] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: crypto.randomUUID(),
      description,
      dueDate,
      priority,
      category,
      goodDeedRating,
      completed: false,
    };
    onAddTask(newTask);
    setDescription('');
    setDueDate(toLocalISOString(new Date()));
    setPriority('Medium');
    setCategory('Personal');
    setGoodDeedRating(3);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="snow-bg">
        <div className="glass-morphism p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-serif text-3xl text-red-600 mb-2 flex items-center justify-center">
                <Sparkles className="w-6 h-6 mr-2 animate-sparkle text-yellow-400" />
                New Journal Entry
                <Sparkles className="w-6 h-6 ml-2 animate-sparkle text-yellow-400" />
              </h2>
              <p className="text-gray-600 italic">Record your good deed for Santa...</p>
            </div>

            <div className="glass-morphism rounded-lg p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-red-400">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Dear Santa, today I..."
                className="w-full p-3 text-lg bg-transparent border-b border-red-100 focus:outline-none focus:border-red-500 font-serif placeholder-gray-400"
                rows={3}
                required
              />
            </div>

            <div className="glass-morphism rounded-lg p-4 space-y-4">
              <div className="flex items-center space-x-3 group">
                <Calendar className="text-red-500 group-hover:rotate-12 transition-transform duration-300" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="flex-1 p-2 border border-red-100 rounded-lg bg-transparent focus:outline-none focus:border-red-500 transition-colors duration-300"
                  required
                />
              </div>

              <div className="flex items-center space-x-3 group">
                <Flag className="text-red-500 group-hover:rotate-12 transition-transform duration-300" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="flex-1 p-2 border border-red-100 rounded-lg bg-transparent focus:outline-none focus:border-red-500 transition-colors duration-300"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 group">
                <Tag className="text-red-500 group-hover:rotate-12 transition-transform duration-300" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="flex-1 p-2 border border-red-100 rounded-lg bg-transparent focus:outline-none focus:border-red-500 transition-colors duration-300"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Family">Family</option>
                  <option value="Community Service">Community Service</option>
                </select>
              </div>
            </div>

            <div className="glass-morphism rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-serif">Impact Rating</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setGoodDeedRating(rating)}
                      className="focus:outline-none transform hover:scale-125 transition-transform duration-300"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= goodDeedRating 
                            ? 'text-yellow-400 fill-yellow-400 animate-sparkle' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg text-lg 
                font-serif hover:from-red-600 hover:to-red-700 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Add to My Journal
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
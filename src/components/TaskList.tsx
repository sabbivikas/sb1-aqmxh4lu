import React from 'react';
import { CheckCircle, Circle, Star, Clock, Gift } from 'lucide-react';
import { Task } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { formatDate, isTaskExpired } from '../utils/dateUtils';
import { TaskTimer } from './TaskTimer';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  onUpdateEffort: (taskId: string, effort: number) => void;
  onUpdateImpact: (taskId: string, impact: number) => void;
}

export default function TaskList({ tasks, onTaskComplete, onUpdateEffort, onUpdateImpact }: TaskListProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="snow-bg">
        <div className="glass-morphism p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl text-red-600 mb-2 flex items-center justify-center">
              <Gift className="w-6 h-6 mr-2 animate-float text-red-500" />
              My Good Deeds Journal
              <Gift className="w-6 h-6 ml-2 animate-float text-red-500" />
            </h2>
            <p className="text-gray-600 italic">Recording kindness, one deed at a time...</p>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => {
              const expired = isTaskExpired(task.dueDate);
              
              return (
                <div
                  key={task.id}
                  className={`glass-morphism rounded-lg p-4 transition-all duration-300 ${
                    task.completed 
                      ? 'border-l-4 border-green-500' 
                      : expired
                      ? 'border-l-4 border-gray-300 opacity-60'
                      : 'border-l-4 border-red-500'
                  } hover:shadow-lg`}
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => onTaskComplete(task.id, !task.completed)}
                      className="mt-1 focus:outline-none transform hover:scale-110 transition-all duration-300"
                      disabled={!task.completed && expired}
                    >
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 animate-sparkle" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className={`font-serif text-lg transition-all duration-300 ${
                          task.completed || expired ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}>
                          {task.description}
                        </p>
                        {!task.completed && !expired && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <TaskTimer dueDate={task.dueDate} />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{formatDate(task.dueDate)}</span>
                          <div className="flex space-x-2">
                            <Badge variant="priority" value={task.priority} />
                            <Badge variant="category" value={task.category} />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-all duration-300 ${
                                i < task.goodDeedRating 
                                  ? 'text-yellow-400 fill-yellow-400 animate-sparkle' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 font-serif">
                <Gift className="w-12 h-12 mx-auto mb-4 text-red-400 animate-float" />
                <p>Your journal is empty. Start recording your good deeds!</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
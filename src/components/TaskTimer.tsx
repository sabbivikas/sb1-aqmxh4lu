import React from 'react';
import { Hourglass } from 'lucide-react';
import { useTaskTimer } from '../hooks/useTaskTimer';

interface TaskTimerProps {
  dueDate: string;
}

export function TaskTimer({ dueDate }: TaskTimerProps) {
  const { timeLeft, isExpired } = useTaskTimer(dueDate);

  return (
    <div className={`flex items-center space-x-1 text-sm ${
      isExpired ? 'text-red-500' : 'text-gray-500'
    }`}>
      <Hourglass className="w-4 h-4" />
      <span>{timeLeft}</span>
    </div>
  );
}
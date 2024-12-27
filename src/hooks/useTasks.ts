import { useState } from 'react';
import { Task, TaskStats } from '../types';
import { calculateTaskStats } from '../utils/statsUtils';
import { toLocalISOString } from '../utils/dateUtils';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    completionRate: 0,
    avgGoodDeedRating: 0,
    highPriorityCompleted: 0,
    onTimeCompletions: 0,
    communityServiceCompleted: 0,
  });

  const handleAddTask = (task: Task) => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks, task];
      const newStats = calculateTaskStats(newTasks);
      setStats(newStats);
      return newTasks;
    });
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              completed, 
              completionDate: completed ? toLocalISOString(new Date()) : undefined 
            }
          : task
      );
      const newStats = calculateTaskStats(newTasks);
      setStats(newStats);
      return newTasks;
    });
  };

  const handleUpdateEffort = (taskId: string, effort: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, effortLevel: effort } : task
      )
    );
  };

  const handleUpdateImpact = (taskId: string, impact: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, impact } : task
      )
    );
  };

  return {
    tasks,
    stats,
    handleAddTask,
    handleTaskComplete,
    handleUpdateEffort,
    handleUpdateImpact
  };
}
import { Task, TaskStats } from '../types';

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const goodDeedRatings = tasks.map(task => task.goodDeedRating);
  const avgGoodDeedRating = goodDeedRatings.length > 0
    ? goodDeedRatings.reduce((a, b) => a + b, 0) / goodDeedRatings.length
    : 0;

  const highPriorityCompleted = tasks.filter(
    task => task.completed && task.priority === 'High'
  ).length;

  const onTimeCompletions = tasks.filter(task => {
    if (!task.completed || !task.completionDate || !task.dueDate) return false;
    return new Date(task.completionDate) <= new Date(task.dueDate);
  }).length;

  const communityServiceCompleted = tasks.filter(
    task => task.completed && task.category === 'Community Service'
  ).length;

  return {
    totalTasks,
    completedTasks,
    completionRate,
    avgGoodDeedRating,
    highPriorityCompleted,
    onTimeCompletions,
    communityServiceCompleted,
  };
};
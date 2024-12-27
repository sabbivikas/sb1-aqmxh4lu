import { TaskStats } from '../types';

export const calculateNiceScore = (stats: TaskStats): number => {
  const weights = {
    completionRate: 0.3,
    goodDeedRating: 0.2,
    highPriority: 0.2,
    onTime: 0.15,
    communityService: 0.15
  };

  const score = 
    (stats.completionRate * 100 * weights.completionRate) +
    (stats.avgGoodDeedRating * 20 * weights.goodDeedRating) +
    (Math.min(stats.highPriorityCompleted * 10, 100) * weights.highPriority) +
    (Math.min(stats.onTimeCompletions * 10, 100) * weights.onTime) +
    (Math.min(stats.communityServiceCompleted * 20, 100) * weights.communityService);

  return Math.round(score);
};
import React from 'react';
import { TaskStats } from '../../types';
import { Card } from '../ui/Card';
import { Trophy, Star, Heart, Gift } from 'lucide-react';

interface AchievementsScreenProps {
  stats: TaskStats;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ stats }) => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Task Master',
      value: `${Math.round(stats.completionRate * 100)}%`,
      description: 'Tasks Completed'
    },
    {
      icon: Star,
      title: 'Good Deeds',
      value: stats.avgGoodDeedRating.toFixed(1),
      description: 'Average Rating'
    },
    {
      icon: Heart,
      title: 'High Priority',
      value: stats.highPriorityCompleted,
      description: 'Tasks Completed'
    },
    {
      icon: Gift,
      title: 'Community',
      value: stats.communityServiceCompleted,
      description: 'Services Done'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements</h2>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map(({ icon: Icon, title, value, description }) => (
          <Card key={title} className="p-4 text-center">
            <Icon className="w-8 h-8 mx-auto text-red-600 mb-2" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <div className="text-2xl font-bold text-red-600">{value}</div>
            <p className="text-sm text-gray-600">{description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
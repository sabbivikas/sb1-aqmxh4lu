import React from 'react';
import { Priority, Category } from '../../types';

interface BadgeProps {
  variant: 'priority' | 'category';
  value: Priority | Category;
}

const variants = {
  priority: {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  },
  category: {
    Work: 'bg-purple-100 text-purple-800',
    Personal: 'bg-blue-100 text-blue-800',
    Family: 'bg-pink-100 text-pink-800',
    'Community Service': 'bg-indigo-100 text-indigo-800'
  }
};

export const Badge: React.FC<BadgeProps> = ({ variant, value }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    variant === 'priority' 
      ? variants.priority[value as Priority] 
      : variants.category[value as Category]
  }`}>
    {value}
  </span>
);
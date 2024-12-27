import React from 'react';
import { Gift, Star, Award, Calendar, Heart } from 'lucide-react';
import { TaskStats } from '../types';
import { Card } from './ui/Card';
import { calculateNiceScore } from '../utils/scoreUtils';
import { calculateDaysUntilChristmas } from '../utils/dateUtils';

interface DashboardProps {
  stats: TaskStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const niceScore = calculateNiceScore(stats);
  const daysUntilChristmas = calculateDaysUntilChristmas();
  const isNiceList = niceScore >= 75;

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="backdrop-blur-sm bg-white/90 p-6">
          <div className="text-center mb-6">
            <h2 className="font-serif text-4xl text-red-600 mb-2 font-bold">Dear Santa,</h2>
            <p className="text-gray-600 italic">
              Here's my journal of good deeds...
            </p>
          </div>
          
          <div className="mb-8 text-center">
            <div className="inline-block bg-white rounded-lg p-4 shadow-md">
              <div className="font-serif text-2xl mb-2">
                {isNiceList ? 'Nice List Entry ✨' : 'Working on being Nice 🌟'}
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-green-600 text-transparent bg-clip-text">
                {niceScore}%
              </div>
              <div className="text-gray-500 mt-1 font-serif">Kindness Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-red-100 pb-2 mb-2">
                <span className="font-serif text-lg text-red-600">Today's Summary</span>
                <Calendar className="text-red-500 w-5 h-5" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats.completedTasks}
                  </div>
                  <div className="text-sm text-gray-600">Good Deeds Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats.avgGoodDeedRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Average Impact</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-red-100 pb-2 mb-2">
                <span className="font-serif text-lg text-red-600">Christmas Countdown</span>
                <Gift className="text-red-500 w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{daysUntilChristmas}</div>
                <div className="text-sm text-gray-600">Days until Christmas</div>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-red-100 pb-2 mb-2">
                <span className="font-serif text-lg text-red-600">Special Achievements</span>
                <Award className="text-red-500 w-5 h-5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">High Priority Tasks</span>
                  <span className="font-bold text-gray-800">{stats.highPriorityCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Community Service</span>
                  <span className="font-bold text-gray-800">{stats.communityServiceCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">On-Time Completion</span>
                  <span className="font-bold text-gray-800">{stats.onTimeCompletions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { isTaskExpired } from '../utils/dateUtils';

export function useTaskTimer(dueDate: string) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (isTaskExpired(dueDate)) {
        setTimeLeft('Expired');
        setIsExpired(true);
        return;
      }

      const now = new Date();
      // Create end of day date in local timezone
      const [year, month, day] = dueDate.split('-').map(Number);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
      setIsExpired(false);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [dueDate]);

  return { timeLeft, isExpired };
}
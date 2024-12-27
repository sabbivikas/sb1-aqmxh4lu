export const calculateDaysUntilChristmas = (): number => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);
  if (today > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  const diffTime = christmas.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: string): string => {
  // Create date from the YYYY-MM-DD string and force it to be interpreted in local timezone
  const [year, month, day] = date.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const toLocalISOString = (date: Date): string => {
  // Get local date components
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate.toISOString().split('T')[0];
};

export const isTaskExpired = (dueDate: string): boolean => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  // Create date from YYYY-MM-DD string in local timezone
  const [year, month, day] = dueDate.split('-').map(Number);
  const taskDate = new Date(year, month - 1, day, 23, 59, 59, 999);
  
  return taskDate < now;
};
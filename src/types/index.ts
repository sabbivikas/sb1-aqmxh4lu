// Existing types...

export interface AutomationRule {
  id: string;
  name: string;
  type: 'recurring' | 'suggestion';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    day?: number; // day of week (0-6) or day of month (1-31)
  };
  taskTemplate: {
    description: string;
    priority: Priority;
    category: Category;
    goodDeedRating: number;
  };
  active: boolean;
  lastRun?: string;
}

// Update TaskStats interface
export interface TaskStats {
  // ... existing fields ...
  automatedTasksCompleted: number;
}
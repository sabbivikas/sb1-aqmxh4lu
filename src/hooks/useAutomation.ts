import { useState, useEffect } from 'react';
import { AutomationRule, Task } from '../types';
import { toLocalISOString } from '../utils/dateUtils';

export function useAutomation(onCreateTask: (task: Omit<Task, 'id'>) => void) {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  // Check and execute automation rules
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      
      rules.forEach(rule => {
        if (!rule.active) return;
        
        const shouldRun = checkRuleSchedule(rule, today);
        if (shouldRun) {
          executeRule(rule);
          updateLastRun(rule.id);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [rules]);

  const checkRuleSchedule = (rule: AutomationRule, date: Date): boolean => {
    if (!rule.schedule || !rule.lastRun) return true;
    
    const lastRun = new Date(rule.lastRun);
    const daysDiff = Math.floor((date.getTime() - lastRun.getTime()) / (1000 * 60 * 60 * 24));

    switch (rule.schedule.frequency) {
      case 'daily':
        return daysDiff >= 1;
      case 'weekly':
        return daysDiff >= 7 && date.getDay() === rule.schedule.day;
      case 'monthly':
        return daysDiff >= 28 && date.getDate() === rule.schedule.day;
      default:
        return false;
    }
  };

  const executeRule = (rule: AutomationRule) => {
    const newTask: Omit<Task, 'id'> = {
      ...rule.taskTemplate,
      dueDate: toLocalISOString(new Date()),
      completed: false
    };
    onCreateTask(newTask);
  };

  const updateLastRun = (ruleId: string) => {
    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === ruleId
          ? { ...rule, lastRun: toLocalISOString(new Date()) }
          : rule
      )
    );
  };

  const addRule = (rule: Omit<AutomationRule, 'id'>) => {
    const newRule: AutomationRule = {
      ...rule,
      id: crypto.randomUUID(),
      active: true
    };
    setRules(prev => [...prev, newRule]);
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  return {
    rules,
    addRule,
    toggleRule,
    deleteRule
  };
}
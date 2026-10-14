import React from 'react';
import { Badge } from '../ui/badge';

interface StatusBadgeProps {
  status: string;
  type?: 'lead' | 'post' | 'talent' | 'service';
}

export function StatusBadge({ status, type = 'lead' }: StatusBadgeProps) {
  const getVariant = () => {
    const s = status.toLowerCase();
    
    if (type === 'lead') {
      if (['won', 'proposal'].includes(s)) return 'default';
      if (['contacted', 'qualified'].includes(s)) return 'secondary';
      if (['lost'].includes(s)) return 'destructive';
      return 'outline';
    }
    
    if (type === 'post') {
      if (s === 'published') return 'default';
      if (['review', 'scheduled'].includes(s)) return 'secondary';
      if (s === 'archived') return 'destructive';
      return 'outline';
    }

    if (type === 'talent' || type === 'service') {
      if (s === 'active') return 'default';
      if (s === 'inactive') return 'secondary';
      return 'outline';
    }

    return 'outline';
  };

  const getCustomClasses = () => {
    const s = status.toLowerCase();
    
    if (type === 'post' && s === 'published') return 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200 dark:text-green-400';
    if (type === 'post' && s === 'draft') return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-200 dark:text-yellow-400';
    
    if (type === 'lead' && s === 'won') return 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200 dark:text-green-400';
    
    return '';
  };

  return (
    <Badge variant={getVariant()} className={`capitalize ${getCustomClasses()}`}>
      {status}
    </Badge>
  );
}

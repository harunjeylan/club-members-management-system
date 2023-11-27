'use client';

import { TransitionContext } from '@client/context/TransitionContext';
import { useContext } from 'react';

export default function Loading() {
  const { isPending } = useContext(TransitionContext);
  return (
    <div className="h-1 w-full bg-secondary-200 dark:bg-secondary-600">
      <div className="h-1 bg-primary-500" style={{ width: '45%' }}></div>
    </div>
  );
}

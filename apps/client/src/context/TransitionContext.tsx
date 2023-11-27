'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState, useTransition } from 'react';

export const TransitionContext = createContext({
  isPending: false,
  handleServerMutation: (callBack: () => Promise<void>) => {},
  startTransition: (e: any) => {},
});

const TransitionProvider = ({ children }: { children: any }) => {
  const [isPending, setPending] = useState(false);
  const [isMutating, setMutating] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (isPending || isTransitionStarted) {
      setMutating(true);
    }
  }, [isPending, isTransitionStarted]);

  const handleServerMutation = async (callBack: () => Promise<void>) => {
    setPending(true);
    await callBack();
    startTransition(router.refresh);
    setPending(false);
  };

  const values = {
    isPending,
    startTransition,
    handleServerMutation,
  };
  return (
    <TransitionContext.Provider value={values}>
      {/* {!isMutating && (
        <div className="h-1 w-full bg-secondary-200 dark:bg-secondary-600">
          <div className="h-1 bg-primary-500" style={{ width: '45%' }}></div>
        </div>
      )} */}
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;

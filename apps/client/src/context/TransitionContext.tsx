'use client';

import Spinner from '@client/components/ui/Spinner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useLayoutEffect, useState, useTransition } from 'react';

export const TransitionContext = createContext({
  isPending: false,
  handleServerMutation: (callBack: () => Promise<void>) => {},
  startTransition: (e: any) => {},
});

const ConfirmationProvider = ({ children }: { children: any }) => {
  const [isPending, setPending] = useState(false);
  const [isMutating, setMutating] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    startTransition(console.log);
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    setMutating(isPending || isTransitionStarted);
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
      {isMutating && (
        <div className="fixed top-2 right-2 z-[1000]">
          <Spinner />
        </div>
      )}
      {children}
    </TransitionContext.Provider>
  );
};

export default ConfirmationProvider;

'use client';

import { TransitionContext } from '@client/context/TransitionContext';
import { useContext } from 'react';
import Spinner from '../ui/Spinner';

export default function Loading() {
  const { isPending } = useContext(TransitionContext);
  return isPending ? (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center py-10">
        <Spinner className='' />
      </div>
    </div>
  ) : (
    <></>
  );
}

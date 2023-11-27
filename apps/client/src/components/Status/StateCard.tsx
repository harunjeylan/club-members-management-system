import { ReactNode } from 'react';

export default function StateCard({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-1 rounded-md bg-secondary-200 dark:bg-secondary-900">
      <div className="flex flex-col gap-4 p-10 mx-auto mt-auto justify-center items-center">
        {children}
      </div>
    </div>
  );
}

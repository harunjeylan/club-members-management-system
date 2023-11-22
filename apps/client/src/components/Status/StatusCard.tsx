import { Space } from '@prisma/client';
import Link from 'next/link';
function StatusCard({}: { space: Space }) {
  return (
    <div className="w-full h-full p-2 rounded-[1rem] flex flex-col gap-2 shadow bg-secondary-200 dark:bg-secondary-900">
      <div className=" h-full"></div>
      <div className="flex flex-col gap-2">
        <div className="py-4"></div>
      </div>
    </div>
  );
}

export default StatusCard;

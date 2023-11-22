import { Space } from '@prisma/client';
import Link from 'next/link';
function SpaceCard({ space }: { space: Space }) {
  return (
    <div className="w-full h-full p-2 rounded-[1rem] flex flex-col gap-2 shadow bg-secondary-200 dark:bg-secondary-900">
      <div className="relative h-full">
        <Link className="h-full w-full" href={`/admin/spaces/${space?.name}`}>
          <div className="flex w-full h-16"></div>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Link href={`/admin/spaces/${space?.name}`} className=" text-xl">
            {space?.name}
          </Link>
          {space.isPrivate ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
              Private
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-bg-fuchsia-600">
              Public
            </span>
          )}
        </div>
        <div className='py-4'>{space.description}</div>
      </div>
    </div>
  );
}

export default SpaceCard;

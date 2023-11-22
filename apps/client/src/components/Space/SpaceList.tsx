import React from 'react';
import SpaceCard from './SpaceCard';
import { Space } from '@prisma/client';
import Link from 'next/link';

function SpaceList({ spaces }: { spaces: Space[] }) {
  return (
    <div>
      <div className="flex justify-between w-full ">
        <div></div>

        <Link href={'/admin/spaces/new'} className="btn-primary py-2 px-4">
          Add Space
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {spaces.map((space, ind) => (
          <SpaceCard key={ind} space={space} />
        ))}
      </div>
    </div>
  );
}

export default SpaceList;

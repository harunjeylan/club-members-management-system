import Header2 from '@client/components/ui/Header2';
import getSpaceDetails from '@client/libs/server/getSpaceDetails';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
type PropsType = {
  children: ReactNode | ReactNode[];
  params: { spaceName: string };
};
export default async function Layout({ children, params }: PropsType) {
  const space = await getSpaceDetails(params.spaceName);
  return (
    <main className="flex flex-col h-full w-full  px-1 md:px-2 lg:px-4 ">
      <div className=" w-full  border-b border-secondary-500 my-4">
        <div className="flex gap-2 items-center my-2">
          <Header2 title={space.name} />
          {space.isPrivate ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
              Private
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-semibold text-fuchsia-600">
              Public
            </span>
          )}
        </div>
        <div>
          <ul className="flex w-full gap-4 py-2">
            <li className="link-text font-bold text-md">
              <Link href={`/spaces/${params.spaceName}`}>Home</Link>
            </li>
            <li className="link-text font-bold text-md">
              <Link href={`/spaces/${params.spaceName}/users`}>
                Users
              </Link>
            </li>
            <li className="link-text font-bold text-md">
              <Link href={`/spaces/${params.spaceName}/roles`}>
                Roles
              </Link>
            </li>
            <li className="link-text font-bold text-md">
              <Link href={`/spaces/${params.spaceName}/events`}>
                Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="">{children}</div>
    </main>
  );
}

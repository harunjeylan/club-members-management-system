import UserSidebar from '@client/components/Sidebar/UserSidebar';
import getCurrentUser from '@client/libs/server/getCurrentUser';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
type PropsType = {
  children: ReactNode | ReactNode[];
};
export default async function Layout({ children }: PropsType) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/auth/login');
  }
  
  return (
    <main className="flex h-full w-full ">
      <UserSidebar user={user} />
      <div className="w-full max-w-[100vw] overflow-x-auto mt-12">
        {children}
      </div>
    </main>
  );
}

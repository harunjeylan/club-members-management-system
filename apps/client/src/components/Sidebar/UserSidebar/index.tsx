'use client';
import Sidebar from '@client/components/ui/Sidebar';
import getFileUrl from '@client/helpers/getFileUrl';
import handleLogout from '@client/libs/client/user/handleLogout';
import { selectCurrentUser } from '@client/libs/features/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserAlt } from 'react-icons/fa';
import { MdAccountBox, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { UserWithAll, UserWithProfileAndRoles } from 'types/user';
type PropsType = {
  user: UserWithAll;
};
function UserSidebar({ user }: PropsType) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Sidebar className="h-[calc(100vh_-_68px)]">
      <div className="relative w-full h-full flex flex-col justify-between gap-2 bg-secondary-100 dark:bg-secondary-900">
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          <ul className="h-full flex flex-col gap-1 bg-secondary-100 dark:bg-secondary-900">
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/profile/account'}
                className="w-full py-4 flex gap-2 items-center"
              >
                <MdAccountBox size={20} />
                Account
              </Link>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/profile/password'}
                className="w-full py-4 flex gap-2 items-center"
              >
                <MdPassword size={20} />
                Password
              </Link>
            </li>
          </ul>
          {user && (
            <div className="w-full flex flex-row items-center gap-2 py-4 px-4 bg-secondary-200 dark:bg-secondary-800">
              {!!user?.profile?.image ? (
                <Image
                  src={getFileUrl(user?.profile?.image)}
                  alt={user.username}
                  width={100}
                  height={100}
                  className="h-12 w-12 aspect-square rounded-full"
                />
              ) : (
                <FaUserAlt size={30} />
              )}
              <Link href={'/profile'} className="">
                <div className="text-start">
                  <div>{user.username}</div>
                  <small>{user.email}</small>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export default UserSidebar;

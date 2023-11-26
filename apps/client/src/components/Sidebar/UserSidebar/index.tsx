'use client';
import Sidebar from '@client/components/ui/Sidebar';
import handleLogout from '@client/libs/client/user/handleLogout';
import { selectCurrentUser } from '@client/libs/features/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { UserWithProfileAndRoles } from 'types/user';
type PropsType = {
  user: UserWithProfileAndRoles | null;
};
function UserSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectCurrentUser);
  return (
    <Sidebar className="w-fit h-[calc(100vh_-_70px)] ">
      <div className="w-full h-full flex flex-col justify-between gap-2 bg-secondary-100 dark:bg-secondary-900">
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          <ul className="h-full flex flex-col gap-1 bg-secondary-100 dark:bg-secondary-900">
            <li className="py-4 px-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link href={'/profile/account'}>Account</Link>
            </li>

            <li className="py-4 px-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <button
                onClick={() =>
                  handleLogout(dispatch, () =>
                    router.push('auth/login?next=/profile')
                  )
                }
                className="w-full text-start"
              >
                Logout
              </button>
            </li>
          </ul>
          {userData && (
            <div className="w-full flex flex-row items-center gap-2 py-4 px-4 bg-secondary-200 dark:bg-secondary-800">
              <div className="aspect-square w-12 bg-primary-400 rounded-full" />
              <Link href={'/profile'} className="">
                <div className="text-start">
                  <div>{userData.username}</div>
                  <small>{userData.email}</small>
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

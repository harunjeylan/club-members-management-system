'use client';
import Sidebar from '@client/components/ui/Sidebar';
import useMediaQuery from '@client/hooks/useMediaQuery';
import handleLogout from '@client/libs/client/handleLogout';
import { selectCurrentUser, setUser } from '@client/libs/features/userSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { UserWithProfileAndRoles } from 'types/user';
type PropsType = {
  user: UserWithProfileAndRoles | null;
};
function AdminSidebar() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [show, setShow] = useState(!isMobile);

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);

  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectCurrentUser);
  return (
    <Sidebar className="h-[calc(100vh_-_70px)] ">
      <div
        className={`w-full h-full flex flex-col justify-between gap-2 bg-secondary-100 dark:bg-secondary-900`}
      >
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          <div className="px-4 py-4 bg-secondary-200 dark:bg-secondary-800">
            <div className="text-xl font-bold">User Dashboard</div>
          </div>

          <ul className="flex flex-col gap-1">
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
        </div>
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
    </Sidebar>
  );
}
{
  /* {userData?.profile?.image.name && (
                <figure className="p-2 flex flex-col gap-2 items-center">
                  <Image
                    src={userData?.profile?.image.name}
                    width={300}
                    height={300}
                    alt="userData avatar"
                    className="rounded-full overflow-hidden bg-secondary-500 w-32 h-32"
                  />
                </figure>
              )} */
}
//  const button = (
//   <div className="w-full bg-secondary-100 dark:bg-secondary-900 flex gap-2 items-center lg:hidden p-2">
//     <button
//       onClick={() => setShow((prev) => !prev)}
//       className={`flex btn-icon`}
//     >
//       {show ? <AiOutlineClose size={20} /> : <AiOutlineMenuFold size={20} />}
//     </button>
//     <div>Profile</div>
//   </div>
// );

export default AdminSidebar;

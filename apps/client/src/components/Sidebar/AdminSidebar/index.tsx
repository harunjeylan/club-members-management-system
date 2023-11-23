'use client';
import Sidebar from '@client/components/ui/Sidebar';
import { selectCurrentUser } from '@client/libs/features/userSlice';
import Link from 'next/link';
import { AiFillSetting } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdEvent,
  MdWorkspaces,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { UserWithProfileAndRoles } from 'types/user';
type PropsType = {
  user: UserWithProfileAndRoles | null;
};
function AdminSidebar() {
  const userData = useSelector(selectCurrentUser);
  return (
    <Sidebar className="h-[calc(100vh_-_70px)]">
      <div
        className={`relative w-full h-full flex flex-col justify-between gap-2 bg-secondary-100 dark:bg-secondary-900`}
      >
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          <div className="px-4 py-4 bg-secondary-200 dark:bg-secondary-800">
            <div className="text-xl font-bold">Admin Dashboard</div>
          </div>

          <ul className="flex flex-col gap-1">
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/dashboard'}
                className="w-full py-2 px-4  flex gap-2 items-center"
              >
                <MdDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/spaces'}
                className="w-full py-2 px-4  flex gap-2 items-center"
              >
                <MdWorkspaces size={20} />
                Spaces
              </Link>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/users'}
                className="w-full py-2 px-4  flex gap-2 items-center"
              >
                <FaUsers size={20} />
                Users
              </Link>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/events'}
                className="w-full py-2 px-4  flex gap-2 items-center"
              >
                <MdEvent size={20} />
                Events
              </Link>
            </li>
            <li className="w-full flex  px-4 py-2 bg-secondary-200 dark:bg-secondary-800">
              <div className="font-extralight ">Administrations</div>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/roles'}
                className="w-full py-2 px-4 flex gap-2 items-center"
              >
                <MdAdminPanelSettings size={20} />
                Roles
              </Link>
            </li>
            <li className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/settings'}
                className="w-full py-2 px-4 flex gap-2 items-center"
              >
                <AiFillSetting size={20} />
                Setting
              </Link>
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

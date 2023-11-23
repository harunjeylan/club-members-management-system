'use client';
import handleLogout from '@client/libs/client/handleLogout';
import {
  selectCurrentUser,
  selectToken,
} from '@client/libs/features/userSlice';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const [show, setShow] = useState(false);
  const [userRole, setUserRole] = useState<Partial<Role> | undefined>();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const router = useRouter();
  // useEffect(() => {
  //   const role = user?.roles.find((role) => {
  //     {
  //       if (role.scop === RoleScop.SUPER && role.code === RoleCode.ADMIN)
  //         return true;
  //       if (role.scop === RoleScop.SUPER && role.code === RoleCode.EDITOR)
  //         return true;
  //       if (role.scop === RoleScop.SPACE && role.code === RoleCode.ADMIN)
  //         return true;
  //       if (role.scop === RoleScop.SPACE && role.code === RoleCode.EDITOR)
  //         return true;
  //     }
  //   });
  //   setUserRole(role);
  // }, [user?.roles]);
  // function getAdminPanelPath(role: Partial<Role>) {
  //   if (role.scop === RoleScop.SUPER && role.code === RoleCode.ADMIN)
  //     return '/dashboard';
  //   if (role.scop === RoleScop.SUPER && role.code === RoleCode.EDITOR)
  //     return '/editor';
  //   if (role.scop === RoleScop.SPACE && role.code === RoleCode.ADMIN)
  //     return `/spaces/${role.spaceName}/admin`;
  //   if (role.scop === RoleScop.SPACE && role.code === RoleCode.EDITOR)
  //     return `/spaces/${role.spaceName}/editor`;
  //   return '/auth/login';
  // }
  return (
    <div className="relative">
      <div>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="flex btn-icon"
        >
          <BsPerson size={20} />
        </button>
      </div>
      {show && (
        <div
          onClick={() => setShow(false)}
          className={`fixed inset-0 bg-transparent `}
        ></div>
      )}
      <div
        className={`absolute w-72 right-0 gap-2 bg-secondary-100 dark:bg-secondary-900 drop-shadow px-2 py-4	${
          show ? 'flex flex-col ' : 'hidden'
        }`}
      >
        {token && user ? (
          <Link href={'/profile'} className="w-full">
            <div className="p-2 flex flex-col gap-2 items-start border-b border-secondary-500 mb-2">
              <div>{user.username}</div>
              <small>{user.email}</small>
            </div>
          </Link>
        ) : (
          ''
        )}
        <ul className="flex flex-col gap-1">
          {userRole && (
            <li className="flex hover:bg-secondary-200 dark:hover:bg-secondary-700">
              <Link
                href={'/dashboard'}
                className="w-full py-2 px-2 "
              >
                Dashboard
              </Link>
            </li>
          )}

          <li className="border-b border-secondary-500 mb-2"></li>
          {token && user ? (
            <>
              <li className="flex">
                <button
                  onClick={() =>
                    handleLogout(dispatch, () => router.push('auth/login'))
                  }
                  className="w-full btn-primary py-2 px-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex">
                <Link
                  href={'/auth/login'}
                  className="w-full btn-primary py-2 px-2"
                >
                  Login
                </Link>
              </li>
              <li className="flex ">
                <Link
                  href={'/auth/register'}
                  className="w-full btn-primary py-2 px-2"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;

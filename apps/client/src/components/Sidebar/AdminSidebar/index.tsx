'use client';
import Sidebar from '@client/components/ui/Sidebar';
import { selectCurrentUser } from '@client/libs/features/userSlice';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdEvent,
  MdWorkspaces,
  MdCategory,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
type PropsType = {
  userRoles: Partial<Role>[];
};
function AdminSidebar({ userRoles }: PropsType) {
  const [searchLink, setSearchLink] = useState('');
  const userData = useSelector(selectCurrentUser);
  const [groups, setGroups] = useState(getLinks(userRoles, searchLink));

  useEffect(() => {
    setGroups(getLinks(userRoles, searchLink));
  }, [searchLink]);

  return (
    <Sidebar className="h-[calc(100vh_-_68px)]">
      <div
        className={`relative w-full h-full flex flex-col justify-between gap-2 bg-secondary-100 dark:bg-secondary-900`}
      >
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          <div className="mb-2">
            <input
              value={searchLink}
              onChange={(e) => setSearchLink(e.target.value)}
              className="input px-2 py-2"
              placeholder="search..."
            />
          </div>

          <ul className="flex flex-col gap-1">
            {groups.map((group, ind) => (
              <li key={ind}>
                <div className="w-full flex  px-4 py-2 bg-secondary-200 dark:bg-secondary-800">
                  <div className="font-extralight ">{group.name}</div>
                </div>
                <ul className="flex flex-col gap-1">
                  {group.links.map(({ Icon, name, link }, ind2) => (
                    <li
                      key={`${ind}-${ind2}`}
                      className="w-full flex ps-4 hover:bg-secondary-200 dark:hover:bg-secondary-700"
                    >
                      <Link
                        href={link}
                        className="w-full py-2 flex gap-2 items-center"
                      >
                        <Icon size={20} />
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
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
const linkGroups = [
  {
    name: 'Main',
    links: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        Icon: MdDashboard,
        accessedFor: [
          { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
          { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
          { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
          { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
          { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
        ],
      },
      {
        name: 'Spaces',
        link: '/spaces',
        Icon: MdWorkspaces,
        accessedFor: [
          { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
          { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
          { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
          { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
          { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
        ],
      },
      {
        name: 'Users',
        link: '/users',
        Icon: FaUsers,
        accessedFor: [
          { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
          { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
        ],
      },
      {
        name: 'Categories',
        link: '/categories',
        Icon: MdCategory,
        accessedFor: [
          { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
          { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
          { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
          { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
        ],
      },
      {
        name: 'Events',
        link: '/events',
        Icon: MdEvent,
        accessedFor: [
          { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
          { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
          
        ],
      },
    ],
  },
  {
    name: 'Administrations',
    links: [
      {
        name: 'Roles',
        link: '/roles',
        Icon: MdAdminPanelSettings,
        accessedFor: [{ scop: RoleScop.SUPER, code: RoleCode.ADMIN }],
      },
      {
        name: 'Settings',
        link: '/settings',
        Icon: AiFillSetting,
        accessedFor: [{ scop: RoleScop.SUPER, code: RoleCode.ADMIN }],
      },
    ],
  },
];
function getLinks(userRoles: Partial<Role>[], searchLink: string) {
  let allowedGroups: typeof linkGroups = [];
  linkGroups.forEach((group) => {
    let allowedLinks: typeof group.links = [];
    group.links.forEach((groupRole) => {
      const isAllowed = !!groupRole.accessedFor.find(
        (groupRole) =>
          !!userRoles.find(
            (userRole) =>
              userRole.code === groupRole.code &&
              userRole.scop === groupRole.scop
          )
      );
      const searchMatch =
        groupRole.name.toLowerCase().includes(searchLink.toLowerCase()) ||
        groupRole.link.toLowerCase().includes(searchLink.toLowerCase());

      if (isAllowed && searchMatch) {
        allowedLinks.push(groupRole);
      }
    });
    if (allowedLinks.length) {
      allowedGroups.push({ ...group, links: allowedLinks });
    }
  });
  return allowedGroups;
}
export default AdminSidebar;

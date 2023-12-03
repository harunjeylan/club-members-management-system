import Link from 'next/link';
import NavLink from '../ui/NavLink';
import Profile from './Profile';
import SearchForm from './SearchForm';
import Theme from './Theme';
import { UserWithAll } from 'types/user';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';

async function Navbar({ user }: { user?: UserWithAll | null }) {
  const adminRoles = getUserAccessRoles(user?.roles ?? [], [
    { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
    { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
  ]);
  return (
    <header className="sticky z-10  top-0 w-full bg-secondary-100 dark:bg-secondary-900">
      <nav className="w-full px-8 py-4 flex justify-between items-center">
        <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-center">
          <Link href="/" className="text-2xl font-bold">
            CSEC ASTU
          </Link>
        </div>
        <div className="">
          <SearchForm />
        </div>
        <div className="flex md:flex-row-reverse gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-center">
          <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-center">
            <Theme />
            <Profile />
          </div>
          <NavLink>
            <Link href={'/blogs'}>Blogs</Link>
            <Link href={'/events'}>Events</Link>
            <Link href={'/forums'}>Forums</Link>
            {!adminRoles.length && (
              <>
                <Link href={'/about'}>About</Link>
                <Link href={'/contacts'}>Contact</Link>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

import Link from 'next/link';
import NavLink from '../ui/NavLink';
import Profile from './Profile';
import SearchForm from './SearchForm';
import Theme from './Theme';

async function Navbar() {
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
            <Link href={'/events'}>Events</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/contact'}>Contact</Link>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

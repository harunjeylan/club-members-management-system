'use client';

import useMediaQuery from '@client/hooks/useMediaQuery';
import React, { ReactNode, useEffect, useState } from 'react';
import { AiOutlineMenuFold, AiOutlineClose } from 'react-icons/ai';
type PropsType = {
  children: ReactNode[];
};
function NavLink({ children }: PropsType) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [show, setShow] = useState(!isMobile);

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);

  return (
    <div>
      <div
        onClick={() => setShow(false)}
        className={`fixed inset-0 bg-black/50 ${
          show && isMobile ? 'translate-x-0' : 'translate-x-full'
        }`}
      ></div>
      <ul
        className={`flex  duration-100 ease-in-out ${
          isMobile
            ? 'fixed z-10 top-0 right-0 pt-8 px-4  flex-col gap-0 bg-secondary-100 dark:bg-secondary-900 inset-y-0 w-3/4 sm:w-1/2 overflow-y-auto'
            : 'flex-row gap-4'
        } ${show ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {children.map((link, ind) => (
          <li
            key={ind}
            className={`font-bold ${
              isMobile
                ? 'py-2 px-1 border-b border-slate-500 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                : 'link-text'
            }`}
          >
            {link}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShow((prev) => !prev)}
        className={`flex btn-icon md:hidden ${
          show ? 'fixed z-20 top-2 right-4' : ''
        }`}
      >
        {show ? <AiOutlineClose size={20} /> : <AiOutlineMenuFold size={20} />}
      </button>
    </div>
  );
}

export default NavLink;

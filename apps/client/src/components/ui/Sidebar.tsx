'use client';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai';
type PropsType = {
  children: ReactNode | ReactNode[];
  className?: string;
  maxWidth?: string;
};
function Sidebar({ children, className, maxWidth = '16rem' }: PropsType) {
  const query = '(max-width: 768px)';
  const [isMobile, setMatches] = useState(false);
  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query);
    setMatches(matchQueryList.matches);
  }, []);

  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener('change', handleChange);
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);
  const [show, setShow] = useState(!isMobile);

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);
  return (
    <aside style={{ position: 'sticky', top: '68px' }} className={className+' h-[calc(100vh_-_68px)]'}>
      <div className={`flex w-auto h-full relative`}>
        <div
          style={{ width: show ? maxWidth : '0px' }}
          className={`h-full flex duration-100 ease-in-out flex-col overflow-hidden gap-0 ${
            isMobile && 'fixed z-[100] left-0 inset-y-0 w-3/4 sm:w-1/2'
          } `}
        >
          <div
            className={`relative w-full h-full overflow-hidden duration-0 ${
              show ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
      <button
        style={{
          transform: show ? `translateX(${maxWidth})` : '',
        }}
        onClick={() => setShow((prev) => !prev)}
        className={`fixed top-16 mt-4 z-[101]  h-fit duration-100 ease-in-out  bg-secondary-100/50 dark:bg-secondary-900/50 btn-icon rounded-r-full rounded-l-none `}
      >
        {show ? <AiOutlineClose size={25} /> : <AiOutlineMenuFold size={25} />}
      </button>
      {isMobile && (
        <div
          onClick={() => setShow(false)}
          className={
            show
              ? 'translate-x-0 fixed inset-0 bg-black/50'
              : '-translate-x-full w-0'
          }
        ></div>
      )}
    </aside>
  );
}

export default Sidebar;

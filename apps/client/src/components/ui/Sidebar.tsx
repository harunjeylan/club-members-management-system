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
  function getBtnTranslateX() {
    if (isMobile) {
      return show ? `translateX(${maxWidth})` : '';
    }
    return '';
  }
  return (
    <aside className={className}>
      <div className={`flex w-fit h-full relative`}>
        <div
          style={{ width: show ? maxWidth : '0px' }}
          className={`h-full flex duration-100 ease-in-out flex-col overflow-hidden gap-0 ${
            isMobile && 'fixed z-[100] pt-2 left-0 inset-y-0 w-3/4 sm:w-1/2'
          } `}
        >
          <div className={`relative w-full h-full overflow-hidden duration-0 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
            {children}
          </div>
        </div>
        <button
          style={{
            transform: getBtnTranslateX(),
          }}
          onClick={() => setShow((prev) => !prev)}
          className={`mt-4 z-[110]  h-fit duration-100 ease-in-out  bg-secondary-100 dark:bg-secondary-900 btn-icon rounded-r-full rounded-l-none`}
        >
          {show ? (
            <AiOutlineClose size={25} />
          ) : (
            <AiOutlineMenuFold size={25} />
          )}
        </button>
      </div>
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

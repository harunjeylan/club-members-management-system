'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosExpand } from 'react-icons/io';
import Portal from './Portal';
type PropsType = {
  children: ReactNode | ReactNode[];
  className?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  expandUrl?: string;
};
function Model({ children, show, setShow, className, expandUrl }: PropsType) {
    ;
    
  return (
    <Portal show={show}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110]">
        <div
          className={`flex w-auto h-full relative ${
            show ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className={className}>
            <div className="w-full flex gap-2 justify-end items-center">
              {expandUrl && (
                <Link href={expandUrl} className="btn-icon">
                  <IoIosExpand size={25} />
                </Link>
              )}
              <button
                onClick={() => setShow((prev) => !prev)}
                className={`btn-icon`}
              >
                <AiOutlineClose size={25} />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className={
          show
            ? 'translate-y-0 fixed inset-0 bg-black/50'
            : '-translate-y-full h-0 w-0'
        }
      ></div>
    </Portal>
  );
}

export default Model;

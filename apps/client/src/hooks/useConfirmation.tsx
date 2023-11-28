import classNames from 'classnames';
import { useState } from 'react';
import { createPortal } from 'react-dom';
export default function useConfirmation() {
  const [show, setShow] = useState(true);
  type PropsType = {
    className?: string;
    onConfirm: () => void;
  };
  function confirm({ className, onConfirm }: PropsType) {
    ;
    
     createPortal(
      <>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110]">
          <div className={`flex w-auto h-full relative  translate-y-0`}>
            <div className={classNames(className, 'flex flex-col gap-4')}>
              <div className="flex flex-col w-full "></div>
              <div className="flex gap-2 w-full ">
                <button onClick={onConfirm} className={`btn-warning`}>
                  confirm
                </button>
                <button
                  onClick={() => setShow((prev) => !prev)}
                  className={`btn-warning`}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={'translate-y-0 fixed inset-0 bg-black/50'}></div>
      </>,
      document.body
    )
  }
  return { confirm };
}

'use client';

import classNames from 'classnames';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const useConfirmation = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState<string>('Confirm');
  const [summery, setSummery] = useState<string>('You want to do this?');
  const [callBack, setCallBack] = useState<() => void>();
  function onConfirm() {
    if (typeof callBack === 'function') {
      callBack();
      onCancel();
    }
  }
  function onCancel() {
    setTitle('Confirm');
    setSummery('You want to do this?');
    setCallBack(undefined);
    setShow(false);
  }
  function confirm(
    callBack: () => void,
    option?: { title?: string; summery?: string }
  ) {
    if (typeof callBack === 'function') {
      setCallBack(() => callBack);
    }
    if (option?.title) {
      setTitle(option?.title);
    }
    if (option?.summery) {
      setSummery(option?.summery);
    }
    setShow(true);
  }

  function ConfirmComp({ className }: { className?: string }) {
    if (show) {
      return createPortal(
        <>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120]">
            <div className={`flex w-auto h-full relative  bg-secondary-100 dark:bg-secondary-900 p-4 rounded-lg`}>
              <div className={classNames(className, 'flex flex-col gap-4')}>
                <div className="flex flex-col w-full ">
                  <div className="text-2xl font-bold">{title}</div>
                  <div className="text-xl font-light">{summery}</div>
                </div>
                <div className="flex gap-2 w-full ">
                  <button onClick={onConfirm} className={`btn-success px-4 py-2 rounded`}>
                    confirm
                  </button>
                  <button onClick={onCancel} className={`btn-warning  px-4 py-2 rounded`}>
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={' fixed inset-0 bg-black/50'}></div>
        </>,
        document.body
      );
    }
    return <></>;
  }
  return {
    confirm,
    ConfirmComp,
  };
};

export default useConfirmation;

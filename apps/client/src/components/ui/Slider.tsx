'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsCircle, BsCircleFill } from 'react-icons/bs';
type PropsType = {
  children: ReactNode[];
  className?: string;
  showItem?: number;
  navigator?: boolean;
};
function Slider({ children, className, showItem, navigator }: PropsType) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      showNext();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function showNext() {
    setIndex((currentIndex) => {
      if (currentIndex >= children.length - 1) {
        return 0;
      }
      return currentIndex + 1;
    });
  }

  function showPrev() {
    setIndex((currentIndex) => {
      if (currentIndex === 0) {
        return children.length - 1;
      }
      return currentIndex - 1;
    });
  }

  function getTranslate() {
    if (index > children.length - (showItem ?? 1)) {
      return `${-100 * 0}%`;
    } else {
      return `${-100 * index}%`;
    }
  }

  return (
    <div className="relative z-0 h-full w-full">
      <div className="relative w-full h-full flex overflow-hidden">
        {children.map((child, ind) => (
          <div
            key={ind}
            style={{
              width: '100%',
              flexShrink: 0,
              flexGrow: 0,
              translate: getTranslate(),
              transition: 'translate 300ms ease-in-out',
            }}
            className={className ?? 'basis-full'}
          >
            {child}
          </div>
        ))}

        {children.length > (showItem ?? 0) && (
          <button
            onClick={showPrev}
            className="slider-btn absolute block top-0 bottom-0 left-0 p-2 cursor-pointer hover:bg-black/10"
          >
            <AiOutlineLeft
              color="white"
              size={30}
              className=" hover:scale-110  bg-black/50 p-1 rounded-full"
            />
          </button>
        )}
        {children.length > (showItem ?? 0) && (
          <button
            onClick={showNext}
            className="slider-btn absolute block top-0 bottom-0 right-0 p-2 cursor-pointer hover:bg-black/10"
          >
            <AiOutlineRight
              color="white"
              size={30}
              className=" hover:scale-110 bg-black/50 p-1 rounded-full"
            />
          </button>
        )}
      </div>
      {(navigator ?? true) && (
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 bottom border-light-500 -mt-8">
          {children.map((_, ind) => (
            <button
              key={ind}
              onClick={() => setIndex(ind)}
              className="rounded-full hover:scale-110"
            >
              {index === ind ? (
                <BsCircleFill
                  size={10}
                  className="hover:scale-110 text-primary"
                />
              ) : (
                <BsCircle size={10} className="hover:scale-110 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;

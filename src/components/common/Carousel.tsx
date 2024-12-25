'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from '@/assets/icons/Chevron';

interface ItemProps {
  id: string;
  content: ReactNode;
}

export interface Props {
  items: ItemProps[];
  autoplay?: boolean;
  className?: string;
  hideButton?: boolean;
  hideIndicator?: boolean;
}

export function Carousel({ 
  items, 
  autoplay = false,
  className,
  hideButton = false,
  hideIndicator = false,
}: Props) {
  const [ currIndex, setCurrIndex ] = useState(0);
  const [ prevIndex, setPrevIndex ] = useState(items.length - 1);
  const [ animate, setAnimate ] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoplayInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const setupAutoplayInterval = () => {
    if (autoplay) {
      clearAutoplayInterval();
      intervalRef.current = setInterval(handleClickNext, 3000);
    }
  };

  const handleClickPrev = () => {
    setAnimate('animate-slide-in-right');

    setCurrIndex((prev) => {
      const nextIndex = prev === 0 ? items.length - 1 : prev - 1;
      setPrevIndex(prev);
      return nextIndex;
    });

    setupAutoplayInterval();
  };

  const handleClickNext = () => {
    setAnimate('animate-slide-in-left');

    setCurrIndex((prev) => {
      const nextIndex = prev === items.length - 1 ? 0 : prev + 1;
      setPrevIndex(prev);
      return nextIndex;
    });

    setupAutoplayInterval();
  };
  
  const handleClickIndicator = (idx: number) => {
    if (currIndex === idx) setAnimate('');
    else if (currIndex > idx) setAnimate('animate-slide-in-right');
    else setAnimate('animate-slide-in-left');

    setCurrIndex(idx);
    setPrevIndex(currIndex);

    setupAutoplayInterval();
  };

  useEffect(() => {
    setupAutoplayInterval();
    return () => clearAutoplayInterval();
  }, [ autoplay ]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(''), 500);
    return () => clearTimeout(timer);
  }, [ animate ]);

  return (
    <div className={`${style.wrapper} ${className}`}>
      {/* Carousel item */}
      <div 
        className={`
          ${style.item.common}
          ${style.item.prev}
        `}>
        {items[prevIndex].content}
      </div>

      <div 
        className={`
          ${style.item.common}
          ${style.item.curr}
          ${animate}
        `}>
        {items[currIndex].content}
      </div>

      {/* Slider indicators */}
      {!hideIndicator && (
        <div className={style.indicator.wrapper}>
          {items.map((_, idx) => (
            <div 
              key={idx}
              className={style.indicator.item} 
              onClick={() => handleClickIndicator(idx)}>
              <span>{(idx + 1).toString().padStart(2, '0')}</span>
              <button 
                type={'button'}
                className={`
                  ${style.indicator.bar}
                  ${idx === currIndex ? 'w-8 bg-main' : 'w-4 bg-gray-800'} 
                `} />
            </div>
          ))}
        </div>
      )}

      {/* <Slider controls */}
      {!hideButton && (
        <>
          <button 
            type={'button'} 
            className={`${style.button.common} ${style.button.prev}`} 
            onClick={handleClickPrev}>
            <span className={style.button.image}>
              <ChevronLeft />
            </span>
          </button>

          <button 
            type={'button'} 
            className={`${style.button.common} ${style.button.next}`} 
            onClick={handleClickNext}>
            <span className={style.button.image}>
              <ChevronRight />
            </span>
          </button>
        </>
      )}
    </div>
  );
}

const style = {
  wrapper: 'w-full relative flex items-center !pb-8 overflow-hidden',
  item: {
    common: 'w-full rounded-lg overflow-hidden',
    prev: '',
    curr: 'absolute z-10',
  },
  indicator: {
    wrapper: 'absolute -translate-x-1/2 left-1/2 bottom-3 z-10 flex gap-8',
    item: 'group flex items-center gap-2 text-sm font-bold cursor-pointer',
    bar: 'h-[2px] bg-gray-800 group-hover:w-8 transition-all duration-300',
  },
  button: {
    common: 'absolute top-[calc(50%-20px)] z-20 flex items-center justify-center px-4 cursor-pointer group focus:outline-none',
    prev: 'start-0',
    next: 'end-0',
    image: `
      w-10 h-10 
      inline-flex justify-center items-center 
      rounded-full bg-white/30 
      group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none
    `,
  }
};
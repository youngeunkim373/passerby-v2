import Link from 'next/link';
import { ReactNode } from 'react';

interface BoardLinkCardProps {
  image: ReactNode;
  link: string;
  subtitle: string;
  title: string;
  className?: string;
}

export function BoardLinkCard({ 
  image, 
  link, 
  subtitle, 
  title, 
  className, 
}: BoardLinkCardProps) {
  return (
    <Link 
      href={link}
      className={`${style.wrapper} ${className}`}>
      {/* Border animation */}
      <span className={style.borderAnimation} />

      {/* Card */}
      <div className={style.image}>
        {image}
      </div>

      <div className={style.textArea.wrapper}>
        <p className={style.textArea.subtitle}>
          {subtitle}
        </p>
        <p className={style.textArea.title}>
          {title}
        </p>
        <p className={style.textArea.more}>
          더 보기
        </p>
      </div>
    </Link>
  );
}

const style = {
  wrapper: `
    group w-full relative
    flex flex-col justify-center items-center gap-4
    bg-white border rounded-lg
    text-center
    overflow-hidden hover:shadow-xl hover:border-transparent
    px-6 py-8
  `,
  borderAnimation: `
    w-full 
    absolute top-0 right-[100%] z-10 group-hover:right-0
    border-t-2 group-hover:border-main 
    transition-all duration-300
  `,
  textArea: {
    wrapper: 'h-full relative z-10 flex flex-col justify-center items-center',
    subtitle: 'text-sm text-gray-500 whitespace-nowrap mb-1',
    title: 'text-xl font-semibold whitespace-nowrap',
    more: `
      w-fit 
      text-sm text-gray-800
      border border-black border-0 border-b-2
      pt-3 pb-1
      group-hover:border-main
    `,
  },
  image: `
    w-16 h-16 min-h-16
    border-2
    inline-flex justify-center items-center 
    rounded-full
    group-focus:ring-4 group-focus:ring-white group-focus:outline-none
    transition-all duration-300 group-hover:border-main
  `,
};
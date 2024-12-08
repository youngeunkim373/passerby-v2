import { SVGProps } from 'react';

export function Close({ 
  fill = 'none', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      aria-hidden={'true'} 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={fill} 
      viewBox={'0 0 14 14'}
      className={`w-3 h-3 ${className}`}
      {...restProps}>
      <path 
        stroke={'currentColor'} 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'}
        strokeWidth={'2'} 
        d={'m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'} />
    </svg>
  );
}

export function CloseSolid({ 
  fill = 'currentColor', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      viewBox={'0 0 24 24'} 
      fill={fill} 
      className={`size-6 + ${className}`}
      {...restProps}>
      <path 
        fillRule={'evenodd'} 
        d={'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'} 
        clipRule={'evenodd'} />
    </svg>
  );
}
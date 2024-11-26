import { SVGProps } from 'react';

export function ChevronDown({ 
  fill = 'none', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={fill} 
      viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={`size-6 ${className}`}
      {...restProps}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'m19.5 8.25-7.5 7.5-7.5-7.5'} />
    </svg>
  );
}

export function ChevronLeft({ 
  fill = 'none', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'}
      fill={fill} 
      viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={`size-5 ${className}`}
      {...restProps}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'M15.75 19.5 8.25 12l7.5-7.5'} />
    </svg>
  );
}

export function ChevronRight({ 
  fill = 'none', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={fill}  
      viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={`size-5 ${className}`}
      {...restProps}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'m8.25 4.5 7.5 7.5-7.5 7.5'} />
    </svg>
  );
}

export function CheckSolid({ 
  fill = 'currentColor', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      viewBox={'0 0 24 24'} 
      fill={fill} 
      className={`size-6 ${className}`}
      {...restProps}>
      <path 
        fillRule={'evenodd'} 
        d={'M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'} 
        clipRule={'evenodd'} />
    </svg>
  );
}

export function Check({ 
  fill = 'none', 
  className = '', 
  ...restProps
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={fill} 
      viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={`size-5 ${className}`}
      {...restProps}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'m4.5 12.75 6 6 9-13.5'} />
    </svg>
  );
}
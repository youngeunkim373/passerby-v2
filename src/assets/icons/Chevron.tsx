import { SVGProps } from 'react';

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={'none'} viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={'size-6'}
      {...props}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'m19.5 8.25-7.5 7.5-7.5-7.5'} />
    </svg>
  );
}

export function CheckSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      viewBox={'0 0 24 24'} 
      fill={'currentColor'} 
      className={'size-6'}
      {...props}>
      <path 
        fillRule={'evenodd'} 
        d={'M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'} 
        clipRule={'evenodd'} />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  // TODO 기본 클래스 적용되도록 수정
  const { className, ...restProps } = props;

  return (
    <svg 
      xmlns={'http://www.w3.org/2000/svg'} 
      fill={'none'} 
      viewBox={'0 0 24 24'} 
      strokeWidth={1.5} 
      stroke={'currentColor'} 
      className={'size-5 ' + className}
      {...restProps}>
      <path 
        strokeLinecap={'round'} 
        strokeLinejoin={'round'} 
        d={'m4.5 12.75 6 6 9-13.5'} />
    </svg>
  );
}
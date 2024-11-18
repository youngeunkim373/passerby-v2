interface Props {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ 
  width, 
  height,
  className = '',
}: Props) {
  return (
    <div
      style={{ width, height, backgroundSize: '1000px 100%' }}
      className={`
        bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200
        rounded
        animate-shimmer
        ${className}
      `}>
      &nbsp;
    </div>
  );
}
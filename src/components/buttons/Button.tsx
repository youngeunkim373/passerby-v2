import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'solid' | 'outlined' | 'text' | 'link';
type ButtonColor = 'main' | 'red' | 'blue' | 'orange' | 'black';
type ButtonSize = 'small' | 'default' | 'large';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({ 
  children, 
  className = '',
  color = 'main', 
  size = 'default', 
  variant = 'outlined', 
  ...buttonProps
}: Props) {
  const style = getStyle({ color, size, variant });

  return (
    <button 
      className={`${style} ${className}`} 
      {...buttonProps}>
      {children}
    </button>
  );
}

interface ButtonConfig {
  variant: Record<ButtonVariant, {
    shape?: string;
    color: Record<ButtonColor, string>;
    size: Record<ButtonSize, string>;
  }>;
}

const buttonConfig: ButtonConfig = {
  variant: {
    solid: {
      shape: 'shadow-sm text-white',
      color: {
        main: 'bg-main hover:bg-main-light',
        red: 'bg-red hover:bg-red-light',
        blue: 'bg-blue hover:bg-blue-light',
        orange: 'bg-orange hover:bg-orange-light',
        black: 'bg-gray-800 hover:bg-gray-700',
      },
      size: {
        small: 'px-4 h-[32px] text-sm',
        default: 'px-6 h-[44px] text-base',
        large: 'px-8 h-[56px] text-lg',
      },
    },
    outlined: {
      shape: 'bg-transparent border box-border shadow-sm',
      color: {
        main: 'border-main text-main hover:border-main-light hover:text-main-light',
        red: 'border-red text-red hover:border-red-light hover:text-red-light',
        blue: 'border-blue text-blue hover:border-blue-light hover:text-blue-light',
        orange: 'border-orange text-orange hover:border-orange-light hover:text-orange-light',
        black: 'border-gray-700 text-gray-800 hover:border-main hover:text-main',
      },
      size: {
        small: 'px-4 h-[32px] text-sm',
        default: 'px-6 h-[44px] text-base',
        large: 'px-8 h-[56px] text-lg',
      },
    },
    text: {
      color: {
        main: 'bg-transparent text-main hover:bg-main-pale',
        red: 'text-red hover:bg-red-pale',
        blue: 'text-blue hover:bg-blue-pale',
        orange: 'text-orange hover:bg-orange-pale',
        black: 'text-gray800 hover:bg-gray-100',
      },
      size: {
        small: 'px-4 h-[32px] text-sm',
        default: 'px-6 h-[44px] text-base',
        large: 'px-8 h-[56px] text-lg',
      },
    },
    link: {
      color: {
        main: 'bg-transparent text-main hover:text-main-light',
        red: 'text-red hover:text-red-light',
        blue: 'text-blue hover:text-blue-light',
        orange: 'text-orange hover:text-orange-light',
        black: 'text-gray-800 hover:text-main',
      },
      size: {
        small: 'px-0 h-[32px] text-sm',
        default: 'px-0 h-[44px] text-base',
        large: 'px-0 h-[56px] text-lg',
      },
    },
  }
} as const;

const getStyle = ({ 
  color = 'main', 
  size = 'default', 
  variant = 'outlined' 
}: Pick<Props, 'color' | 'size' | 'variant'>) => `
  duration-200
  flex 
  font-semibold
  justify-center
  items-center
  leading-6
  rounded-md
  transition-all
  whitespace-nowrap
  ${buttonConfig.variant[variant].shape ?? ''}
  ${buttonConfig.variant[variant].color[color] ?? ''}
  ${buttonConfig.variant[variant].size[size] ?? ''}
`;
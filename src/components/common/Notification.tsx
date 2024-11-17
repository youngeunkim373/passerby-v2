'use client';
import { ReactNode, useEffect, useRef } from 'react';

import { Check } from '@/assets/icons/Chevron';
import { Close } from '@/assets/icons/Close';
import { Presence } from '@/components/common/Presence';
import { useNotificationContext } from '@/contexts/NotificationContext';

type NotificationType = 'info' | 'success' | 'danger' | 'warning';

export interface Props {
  id?: number;
  type?: NotificationType;
  title: string;
  content?: string;
  className?: string;
  closalble?: boolean;
  duration?: number | 'always';
  icon?: ReactNode;
  showIcon?: boolean;
}

export function Notification({ 
  id,
  type = 'info', 
  title, 
  content, 
  closalble = true,
  className = '',
  duration = 3000,
  icon,
  showIcon = true,
}: Props) {
  const notificationRef = useRef<HTMLDivElement>(null);

  const { notifications, hide } = useNotificationContext();

  const isVisible = !!notifications.find((n) => n.element.props.id === id && n.visible);

  const handleHide = (id: number) => {
    if (notificationRef.current) {
      notificationRef.current.style.maxHeight = '0';
    }

    hide(id);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if(duration !== 'always' && id) {
      timer = setTimeout(() => handleHide(id), duration);
    }

    return () => {
      if(timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (notificationRef.current) {
      const height = notificationRef.current.offsetHeight;
      notificationRef.current.style.maxHeight = `${height}px`;
    }
  }, []);
 
  return (
    <Presence present={isVisible}>
      <div 
        ref={notificationRef}
        className={`
          ${style.wrapper}
          ${NotificationConfig.wrapper[type]}
          ${isVisible ? 'animate-[fadeIn_.2s_ease-in-out]' : 'animate-[fadeOut_.2s_ease-in-out]'}
          ${className}
        `}>
        {showIcon && (
          <div className={style.icon}>
            {icon ?? typeIcon[type]}
          </div>
        )}

        <div>
          <div className={style.title}>{title}</div>
          {content && (
            <div className={style.content}>
              {content} 
            </div>
          )}
        </div>

        {closalble && (
          <button 
            type={'button'} 
            className={style.close}
            onClick={() => id && handleHide(id)}>
            <Close />
          </button>
        )}
      </div>
    </Presence>
  );
}

const typeIcon: Record<NotificationType, ReactNode> = {
  info: <span>i</span>,
  success: <Check />,
  danger: <Close />,
  warning: <span>!</span>,
};

const NotificationConfig = {
  wrapper: {
    info: 'bg-blue',
    success: 'bg-green',
    danger: 'bg-red',
    warning: 'bg-orange',
  }
};

const style = {
  wrapper: `
    w-full h-auto
    flex items-center
    rounded-lg
    text-sm text-white
    p-4
    transition-all duration-700 ease-in-out
  `,
  icon: `
    w-8 h-8 min-w-8
    flex justify-center items-center
    bg-white bg-opacity-30 rounded-full
    text-sm font-extrabold
    mr-4
  `,
  title: 'text-base font-semibold',
  content: 'text-sm text-white text-opacity-85 font-[500] whitespace-pre-line my-2',
  close: `
    w-8 h-8
    rounded-lg
    p-2 ms-auto translate-x-2
  `,
};
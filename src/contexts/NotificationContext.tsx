'use client';
import { cloneElement, createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react';

import { Notification } from '@/components/common/Notification';

// @ts-expect-error: known issue
const NotificationContext = createContext<ReturnType<typeof useNotification>>(null);

interface NotificationContextProps {
  element: ReactElement;
  visible: boolean;
}

const useNotification = () => {
  const [ notifications, setNotifications ] = useState<NotificationContextProps[]>([]);

  const show = (newNotification: ReactElement) => {
    const newNotificationWithId = cloneElement(
      newNotification, 
      { id: Date.now().valueOf() },
    );

    setNotifications((prev) => [ 
      ...(prev.filter((n) => n.visible)), 
      { element: newNotificationWithId, visible: true },
    ]);

  };

  const hide = (id: number) => {
    setNotifications((prev) => prev.map((n) =>
      n.element.props.id === id
        ? { ...n, visible: false }
        : n
    ));
  };

  return {
    notifications,
    hide,
    show,
  };
};

export function useNotificationContext() {
  return useContext(NotificationContext);
}

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const state = useNotification();

  return (
    <NotificationContext.Provider value={state}>
      {children}

      <div 
        className={`
          max-h-[calc(100%-81px)]
          fixed top-20 z-[60]
          right-[max(calc(50%-31rem),1rem)] md:right-[max(calc(50%-30rem),2rem)]
          flex flex-col gap-2
          overflow-y-auto overscroll-none
          ml-4 md:ml-0
        `}>
        {state.notifications.map((n) => (
          <Notification 
            key={n.element.props.id} 
            className={'max-w-[500px] self-end'}
            {...n.element.props} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
} 
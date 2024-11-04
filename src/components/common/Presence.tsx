import { Children, cloneElement } from 'react';
import { usePresence } from '@/hooks/usePresence';

interface Props {
  children: React.ReactElement;
  present: boolean;
}

export function Presence ({ present, children }: Props) {
  const { isPresent, handleNodeRef } = usePresence(present);
  const child = Children.only(children);

  const assignRef = (node: HTMLElement) => {
    handleNodeRef(node);

    // 자식 컴포넌트에서 ref가 넘어오는 경우를 대비
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childRef = (child as any).ref;
    if (childRef) childRef.current = node;
  };

  return isPresent 
    ? cloneElement(children, { ref: assignRef }) 
    : null;
};
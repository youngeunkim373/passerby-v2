import { useCallback, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type ElementState = 'MOUNTED' | 'UNMOUNTSUSPENDED' | 'UNMOUNTED';
type ActionType = 'MOUNT' | 'ANIMATION_START' | 'ANIMATION_END' | 'UNMOUNT';

const animationStateMachine: Record<ElementState, Partial<Record<ActionType, ElementState>>> = {
  MOUNTED: {
    UNMOUNT: 'UNMOUNTED',
    ANIMATION_START: 'UNMOUNTSUSPENDED',
  },
  UNMOUNTSUSPENDED: {
    MOUNT: 'MOUNTED',
    ANIMATION_END: 'UNMOUNTED',
  },
  UNMOUNTED: {
    MOUNT: 'MOUNTED',
  },
};

const getAnimationName = (styles: CSSStyleDeclaration) => {
  return styles.animationName || 'none';
};

export const usePresence = (present: boolean) => {
  const [ node, setNode ] = useState<HTMLElement>(); // 현재 애니메이션 적용 대상 node
  const stylesRef = useRef<CSSStyleDeclaration>({} as CSSStyleDeclaration); // 위 node의 현재 css 스타일
  const prevAnimationNameRef = useRef<string>('none'); // 이전에 실행된 애니메이션 이름

  // 현재 state와 시행되어야 할 action에 따라 다음 state를 결정하는 함수
  const action = (state: ElementState, action: ActionType) => {
    const nextState = (animationStateMachine[state])[action];
    return nextState ?? state;
  } ; 

  // 애니메이션 적용 엘리먼트의 상태 및 행동 관리 reducer
  const [ state, send ] = useReducer(action, (present ? 'MOUNTED' : 'UNMOUNTED'));

  // 엘리먼트가 남아있는지 여부
  const isPresent = [ 'MOUNTED', 'UNMOUNTSUSPENDED' ].includes(state);

  // 외부에서 주입한 엘리먼트와 그 스타일을 저장하는 함수
  const handleNodeRef = useCallback((node: HTMLElement) => {
    if(node) stylesRef.current = getComputedStyle(node);
    setNode(node);
  }, []);

  // 엘리먼트 노출 상태가 변할 때마다
  // 새 애니메이션이 진행되어야 하는지 판단
  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const prevAnimationName = prevAnimationNameRef.current;
    const currentAnimationName = getAnimationName(styles);

    if (present) {
      send('MOUNT');
    } else if (currentAnimationName === 'none' || styles?.display === 'none') { // 애니메이션이 없을 경우
      send('UNMOUNT');
    } else {
      const isAnimating = prevAnimationName !== currentAnimationName;

      if (isAnimating) send('ANIMATION_START');
      else send('UNMOUNT');
    }
  }, [ present, send ]); 

  // animationstart
  const handleAnimationStart = useCallback((event: AnimationEvent) => {
    if (event.target === node) {
      prevAnimationNameRef.current = getAnimationName(stylesRef.current);
    }
  }, [ node ]);
 
  // animationend
  const handleAnimationEnd = useCallback((event: AnimationEvent) => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    const isCurrentAnimation = currentAnimationName.includes(event.animationName);

    if (event.target === node && isCurrentAnimation) {
      flushSync(() => send('ANIMATION_END'));
    }
  }, [ node, send ]);

  // 엘리먼트에 애니메이션 이벤트 리스너 추가/제거
  useLayoutEffect(() => {
    if(!node) return;
    
    node.addEventListener('animationstart', handleAnimationStart);
    node.addEventListener('animationcancel', handleAnimationEnd);
    node.addEventListener('animationend', handleAnimationEnd);
    return () => {
      node.removeEventListener('animationstart', handleAnimationStart);
      node.removeEventListener('animationcancel', handleAnimationEnd);
      node.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [ handleAnimationEnd, handleAnimationStart, node, send ]);

  return { isPresent, handleNodeRef };
};
import { ForwardedRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if ((typeof obj1 !== 'object' || typeof obj2 !== 'object') || (obj1 == null || obj2 == null)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  
  return keys1.every((key) => isEqual(obj1[key], obj2[key]));
};

export const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node); // 함수형 ref 처리
        } else {
          ref.current = node; // 객체형 ref 처리
        }
      }
    });
  };
};
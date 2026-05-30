import { useEffect, type RefObject } from 'react';

/**
 * Hook that calls a callback when a click or touch occurs outside the referenced element.
 *
 * @param {unknown} ref - React ref to the element being watched.
 * @param {(event: MouseEvent | TouchEvent) => void} callback - Function called when outside click is detected.
 */
export const useOutsideClick = (ref: RefObject<HTMLDivElement | null>, callback: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

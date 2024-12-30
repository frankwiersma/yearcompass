import { useEffect, useRef, RefObject } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  onChange?: (inView: boolean) => void;
};

export function useInView({ 
  threshold = 0, 
  rootMargin = '0px', 
  delay = 1000,
  onChange 
}: Options = {}): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element || !onChange) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }
          // Set new timeout
          timeoutRef.current = window.setTimeout(() => {
            onChange(true);
          }, delay);
        } else {
          // Clear timeout if element is no longer in view
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, onChange]);

  return ref;
}
/**
 * useInViewAnimation Hook
 * Triggers animation when element scrolls into view
 * Uses Intersection Observer for efficient viewport detection
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;        // 0-1, percentage of element visible to trigger
  triggerOnce?: boolean;     // Only trigger once, don't re-trigger on scroll
  rootMargin?: string;       // Margin around root element
  delay?: number;            // Delay before triggering animation (ms)
}

interface UseInViewAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  hasAnimated: boolean;
}

/**
 * Custom hook for triggering animations when element enters viewport
 * 
 * @example
 * const { ref, isInView } = useInViewAnimation({ threshold: 0.3 });
 * 
 * return (
 *   <div ref={ref} className={isInView ? 'animate-fadeIn' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 */
export const useInViewAnimation = (
  options: UseInViewAnimationOptions = {}
): UseInViewAnimationReturn => {
  const {
    threshold = 0.2,
    triggerOnce = true,
    rootMargin = '0px',
    delay = 0,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsInView(true);
            setHasAnimated(true);
          }, delay);
        } else {
          setIsInView(true);
          setHasAnimated(true);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [delay, triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show the content
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return {
    ref,
    isInView,
    hasAnimated,
  };
};

export default useInViewAnimation;

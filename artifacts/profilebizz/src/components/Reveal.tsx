import { useRef, useEffect, ReactNode, ElementType } from 'react';

interface RevealProps {
  children: ReactNode;
  /** ms delay before animation starts — use for staggered grids */
  delay?: number;
  /** Animation direction */
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
  /** Render as a different element (e.g. 'section', 'article') */
  as?: ElementType;
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
}

/**
 * Zero-dependency scroll reveal wrapper.
 * Uses IntersectionObserver — no layout impact, GPU-composited.
 * Respects prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as: Tag = 'div',
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const trigger = () => el.classList.add('revealed');
          delay ? setTimeout(trigger, delay) : trigger();
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag ref={ref} data-reveal={direction} className={className}>
      {children}
    </Tag>
  );
}

import { useEffect, DependencyList } from 'react';

/**
 * Attach IntersectionObserver to every [data-reveal] element in the document.
 * Elements animate when they enter the viewport (fade + slide per CSS).
 * Re-runs safely when deps change (e.g. when async content loads).
 *
 * @param deps - Extra deps that re-trigger the scan (e.g. [sections.length])
 */
export function useScrollReveal(deps: DependencyList = []) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    ).filter(el => !el.classList.contains('revealed'));

    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.getAttribute('data-delay') || 0);
          const trigger = () => el.classList.add('revealed');
          delay ? setTimeout(trigger, delay) : trigger();
          obs.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    elements.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

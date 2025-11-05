export const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export const forceReflow = (el) => void el.offsetWidth;

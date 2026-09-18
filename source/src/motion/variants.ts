import type { Variants } from "framer-motion";

/** Scroll-triggered fade + rise, for standalone content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent variant for grids/lists — staggers children's own `visible` state. */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Child item for use alongside staggerChildren on the parent. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Large cinematic entrance for hero sections: scale + fade, slightly slower. */
export const heroReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Style object for parallax image wrappers — paired with useScroll/useTransform at the call site. */
export const parallaxImage = {
  initial: { scale: 1.08 },
};

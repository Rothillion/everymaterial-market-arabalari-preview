import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Wraps Framer Motion's useInView with a reduced-motion escape hatch: when the
 * user prefers reduced motion, isInView is forced true immediately so content
 * is correctly positioned without waiting on a scroll trigger. The actual
 * animation suppression comes from the app-root <MotionConfig reducedMotion="user">
 * (see main.tsx) — this hook only avoids the scroll-wait, it does not itself
 * disable the transition.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(amount: number = 0) {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount });
  return { ref, isInView: shouldReduceMotion ? true : inView };
}

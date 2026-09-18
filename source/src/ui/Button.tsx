import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type BaseProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "outline-light";
};

/** Native DOM event props whose signatures clash with Motion's own gesture/animation props. */
type MotionConflicting = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration";

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicting> & { href?: never };

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflicting> & { href: string };

const solidClasses =
  "bg-accent-deep text-white hover:bg-accent-deepHover px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors";
const outlineClasses =
  "border border-navy/20 text-navy hover:border-accent hover:text-accent-deep px-6 py-3 rounded-full text-sm font-bold transition-colors";
const outlineLightClasses =
  "border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-colors backdrop-blur-sm";

const variantClasses = {
  solid: solidClasses,
  outline: outlineClasses,
  "outline-light": outlineLightClasses,
};

function isLinkProps(props: ButtonProps | LinkProps): props is LinkProps {
  return "href" in props && Boolean(props.href);
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "solid" } = props;
  const classes = variantClasses[variant];

  if (isLinkProps(props)) {
    const { children, variant: _variant, href, ...anchorRest } = props;
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        {...anchorRest}
      >
        {children}
      </motion.a>
    );
  }

  const { children, variant: _variant, type: _type, ...buttonRest } = props;
  return (
    <motion.button
      type="button"
      className={classes}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      {...buttonRest}
    >
      {children}
    </motion.button>
  );
}

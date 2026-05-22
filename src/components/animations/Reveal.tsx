"use client";

import { motion, Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "blur-up"
  | "flip-up";

const EASING = [0.16, 1, 0.3, 1] as const;

function buildVariants(variant: RevealVariant, y: number): Variants {
  switch (variant) {
    case "fade-up":
      return {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      };
    case "fade-down":
      return {
        hidden: { opacity: 0, y: -y },
        show: { opacity: 1, y: 0 },
      };
    case "fade-in":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -60 },
        show: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: 60 },
        show: { opacity: 1, x: 0 },
      };
    case "scale-up":
      return {
        hidden: { opacity: 0, scale: 0.88 },
        show: { opacity: 1, scale: 1 },
      };
    case "blur-up":
      return {
        hidden: { opacity: 0, y: y * 0.6, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "flip-up":
      return {
        hidden: { opacity: 0, rotateX: 18, y: y * 0.5 },
        show: { opacity: 1, rotateX: 0, y: 0 },
      };
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.72,
  y = 40,
  variant = "fade-up",
  once = true,
  amount = 0.14,
}: RevealProps) {
  const variants = buildVariants(variant, y);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, ease: EASING, delay }}
      style={variant === "flip-up" ? { perspective: 800 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* Stagger parent ----------------------------------------------------------- */
type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
};

export function RevealStagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  amount = 0.12,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger child (fade-up by default) --------------------------------------- */
type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
};

export function RevealItem({
  children,
  className,
  variant = "fade-up",
  duration = 0.6,
}: RevealItemProps) {
  const variants = buildVariants(variant, 28);
  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration, ease: EASING }}
    >
      {children}
    </motion.div>
  );
}

/* Two-column split reveal (left + right simultaneously) ------------------- */
export function RevealSplit({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  delay = 0,
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: delay } } }}
    >
      <motion.div
        className={leftClassName}
        variants={{ hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.75, ease: EASING }}
      >
        {left}
      </motion.div>
      <motion.div
        className={rightClassName}
        variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.75, ease: EASING }}
      >
        {right}
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, Variants, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  index?: number;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function makeVariants(direction: Direction): Variants {
  const hidden: Record<string, number> = { opacity: 0 };
  const visible: Record<string, number> = { opacity: 1 };

  if (direction === "up") { hidden.y = 40; visible.y = 0; }
  if (direction === "left") { hidden.x = -40; visible.x = 0; }
  if (direction === "right") { hidden.x = 40; visible.x = 0; }

  return { hidden, visible };
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  index = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  const variants = makeVariants(direction);
  const staggerDelay = delay + index * 0.1;

  const transition: Transition = {
    duration: 0.6,
    delay: staggerDelay,
    ease: EASE,
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Mode = "word" | "line" | "char";

interface TextRevealProps {
  text: string;
  className?: string;
  mode?: Mode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariant: Variants = {
  hidden: { opacity: 0, y: "100%", filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE,
    },
  },
};

function splitByWord(text: string): string[] {
  return text.split(" ");
}

function splitByLine(text: string): string[] {
  return text.split(/\n|\. /).filter(Boolean);
}

function splitByChar(text: string): string[] {
  return text.split("");
}

export default function TextReveal({
  text,
  className,
  mode = "word",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  const tokens =
    mode === "word"
      ? splitByWord(text)
      : mode === "line"
      ? splitByLine(text)
      : splitByChar(text);

  const variant = mode === "char" ? charVariant : childVariant;

  const containerWithDelay: Variants = {
    hidden: container.hidden,
    visible: {
      ...(container.visible as object),
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      variants={containerWithDelay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
      role="text"
      style={{ overflow: "hidden" }}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span className="inline-block" variants={variant}>
            {token}
          </motion.span>
          {mode !== "char" && i < tokens.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

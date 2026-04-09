"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

export default function PlanosClient({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              borderRadius: "14px",
              border: isOpen
                ? "1px solid rgba(55,138,221,0.35)"
                : "1px solid rgba(255,255,255,0.08)",
              backgroundColor: isOpen ? "rgba(55,138,221,0.06)" : "#16162A",
              overflow: "hidden",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                gap: "16px",
                cursor: "pointer",
                background: "none",
                border: "none",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: isOpen ? "white" : "rgba(255,255,255,0.8)",
                  lineHeight: 1.4,
                }}
              >
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ flexShrink: 0 }}
              >
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                    color: isOpen ? "#378ADD" : "rgba(255,255,255,0.35)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

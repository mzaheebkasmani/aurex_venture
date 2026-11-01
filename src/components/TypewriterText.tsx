import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypewriterText({ text, className = "", delay = 0 }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (inView && !isTyping) {
      setIsTyping(true);
      setTimeout(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            setDisplayText(text.slice(0, i + 1));
            i++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
          }
        }, 50); // Speed of typing
      }, delay * 1000);
    }
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={`${className} inline-block`}>
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[0.15em] bg-current ml-[2px]"
        style={{ opacity: isTyping ? 1 : 0, display: isTyping ? "inline-block" : "none" }}
      >&nbsp;</motion.span>
    </span>
  );
}

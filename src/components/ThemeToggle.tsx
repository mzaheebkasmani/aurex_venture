import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  const applyTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("themechange"));
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isLightSaved = saved === "light";
    const initialDark = !isLightSaved;
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    const handleSync = () => {
      const current = localStorage.getItem("theme");
      setIsDark(current !== "light");
    };

    window.addEventListener("themechange", handleSync);
    return () => window.removeEventListener("themechange", handleSync);
  }, []);

  const toggleTheme = () => {
    applyTheme(!isDark);
  };

  const isSmall = size === "sm";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer border ${
        isSmall ? "w-8 h-8" : "w-9 h-9 sm:w-10 sm:h-10"
      } bg-slate-100/90 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-brand hover:border-brand/40 shadow-sm ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: -8, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun size={isSmall ? 15 : 18} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          ) : (
            <Moon size={isSmall ? 15 : 18} className="text-violet-600 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

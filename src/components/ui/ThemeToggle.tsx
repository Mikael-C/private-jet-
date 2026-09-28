"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-jet-800/50 dark:bg-white/10 text-slate-800 dark:text-gold hover:bg-gold/20 dark:hover:bg-white/20 transition-colors border border-slate-200 dark:border-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} className="text-jet-950" />
      )}
    </button>
  );
}

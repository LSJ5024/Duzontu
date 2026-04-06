"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 렌더링 전 아이콘 자리 표시 (깜빡임 방지용)
    return <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 animate-pulse"></div>;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 shadow-sm transition-all dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

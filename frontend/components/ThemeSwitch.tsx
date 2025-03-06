"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function ThemeSwitch() {
  const { setTheme, theme = "system" } = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.checked = theme === "dark";
  }, []);

  const handleToggle = () => {
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 500); // Delay for smooth transition
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        onChange={handleToggle}
        ref={ref}
      />
      <div className="w-16 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-8 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
    </label>
  );
}

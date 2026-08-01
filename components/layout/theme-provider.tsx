"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { deferStorageHydration, persistAfterStorageHydration, useStorageHydrationGate } from "@/lib/storage-hydration";

export type Mode = "light" | "dark";

type ThemeContextValue = {
  mode: Mode;
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  isDark: true,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  const storageHydration = useStorageHydrationGate();

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("fmc_mode") as Mode | null;
    return deferStorageHydration(storageHydration, () => {
      if (saved === "light" || saved === "dark") setMode(saved);
    });
  }, [storageHydration]);

  // Persist theme changes
  useEffect(() => {
    persistAfterStorageHydration(storageHydration, () => localStorage.setItem("fmc_mode", mode));
  }, [mode, storageHydration]);

  // Global keyboard shortcut: Ctrl/Cmd + L toggles theme
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setMode((m) => (m === "dark" ? "light" : "dark"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const isDark = mode === "dark";

  return (
    <ThemeContext.Provider value={{ mode, isDark, toggle }}>
      <div
        className={
          isDark
            ? "bg-neutral-950 text-neutral-100"
            : "bg-neutral-50 text-neutral-900"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

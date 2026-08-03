"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { deferStorageHydration, persistAfterStorageHydration, safeGetLocalStorage, useStorageHydrationGate } from "@/lib/storage-hydration";

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
    const saved = safeGetLocalStorage("fmc_mode") as Mode | null;
    return deferStorageHydration(storageHydration, () => {
      if (saved === "light" || saved === "dark") setMode(saved);
    });
  }, [storageHydration]);

  // Persist theme changes
  useEffect(() => {
    persistAfterStorageHydration(storageHydration, () => localStorage.setItem("fmc_mode", mode));
  }, [mode, storageHydration]);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const isDark = mode === "dark";

  return (
    <ThemeContext.Provider value={{ mode, isDark, toggle }}>
      <div
        data-theme={mode}
        className={
          isDark
            ? "min-h-screen bg-neutral-950 text-neutral-100"
            : "min-h-screen bg-neutral-50 text-neutral-900"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

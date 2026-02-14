"use client";

import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type CardProps = {
  label: string;
  value: string;
  onCopy: () => void;
};

export function Card({ label, value, onCopy }: CardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={cx(
        "rounded-2xl border shadow-sm",
        isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
      )}
    >
      <div
        className={cx(
          "flex items-center justify-between px-3 py-2 border-b",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        <div className="text-sm font-semibold">{label}</div>
        <button
          className={cx(
            "text-sm rounded-xl px-3 py-1.5 border transition-colors",
            isDark
              ? "border-white/10 hover:bg-white/10"
              : "border-black/10 hover:bg-black/5"
          )}
          onClick={onCopy}
          type="button"
        >
          Copy
        </button>
      </div>

      <div className="p-3">
        <pre className="whitespace-pre-wrap break-words text-sm leading-6">
          {value || "\u00A0"}
        </pre>
      </div>
    </div>
  );
}

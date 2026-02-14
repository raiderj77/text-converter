"use client";

import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  const { isDark } = useTheme();

  return (
    <section
      className={cx(
        "mt-6 rounded-2xl border shadow-sm",
        isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
      )}
    >
      <div
        className={cx(
          "px-4 py-3 border-b",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
        {description ? (
          <p
            className={cx(
              "mt-1 text-sm",
              isDark ? "text-neutral-300" : "text-neutral-600"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

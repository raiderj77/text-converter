/**
 * Ad slot marker component.
 *
 * Currently using AdSense Auto Ads — Google automatically places ads
 * via the script in layout.tsx. These markers reserve spacing so
 * auto-placed ads have natural insertion points.
 *
 * The wrapper now reserves explicit `min-width` / `min-height` based on
 * `adFormat` so layout space is held BEFORE the AdSense iframe is injected.
 * This is required for a 0.0 CLS score — any later DOM growth from an
 * unreserved ad slot triggers shift penalties on Core Web Vitals.
 *
 * AdSense account: ca-pub-7171402107622932
 */

type AdFormat = "rectangle" | "leaderboard" | "skyscraper" | "auto";

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  page?: string;
  adFormat?: AdFormat;
};

/**
 * Format-to-Tailwind dimensions.
 * Values match the IAB display ad standard sizes; `auto` mirrors the
 * common medium-rectangle footprint to cover the worst-case shift.
 */
const FORMAT_CLASS: Record<AdFormat, string> = {
  rectangle:   "min-w-[300px] min-h-[250px]",
  leaderboard: "min-w-[320px] min-h-[50px] md:min-w-[728px] md:min-h-[90px]",
  skyscraper:  "min-w-[160px] min-h-[600px]",
  auto:        "min-w-[300px] min-h-[250px]",
};

export function AdSlot({ slot, page = "default", adFormat = "auto" }: AdSlotProps) {
  return (
    <div
      id={`ad-${page}-${slot}`}
      data-ad-slot={slot}
      data-ad-format={adFormat}
      aria-label="Advertisement"
      role="complementary"
      className={`my-8 mx-auto block ${FORMAT_CLASS[adFormat]}`}
      style={{ contain: "layout" }}
    />
  );
}

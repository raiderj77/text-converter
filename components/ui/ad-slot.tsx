/**
 * Ad slot marker component.
 *
 * Currently using AdSense Auto Ads — Google automatically places ads
 * via the script in layout.tsx. These markers reserve spacing so
 * auto-placed ads have natural insertion points.
 *
 * When you create manual ad units in AdSense, replace this with
 * <ins class="adsbygoogle"> elements using the numeric slot IDs.
 */

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  page?: string;
};

export function AdSlot({ slot, page = "default" }: AdSlotProps) {
  return <div className="my-8" id={`ad-${page}-${slot}`} />;
}

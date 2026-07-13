/**
 * Advertising is intentionally disabled while FlipMyCase is not approved by
 * Google AdSense. Keeping this component as a no-op lets product pages retain
 * stable integration points without rendering empty space or allowing a stale
 * deployment environment variable to activate advertising accidentally.
 *
 * A future advertising release must replace this no-op only after approval,
 * policy review, and a certified consent platform are all verified.
 */

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  page?: string;
  adFormat?: "rectangle" | "leaderboard" | "skyscraper" | "auto";
};

export function AdSlot(_props: AdSlotProps) {
  return null;
}

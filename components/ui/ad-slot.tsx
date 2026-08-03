/**
 * Advertising is intentionally disabled while FlipMyCase is not approved by
 * Google AdSense. Keeping this component as a no-op lets product pages retain
 * stable integration points without rendering empty space or allowing a stale
 * deployment environment variable to activate advertising accidentally.
 *
 * A future advertising release must replace this no-op only after the site is
 * Ready in AdSense, ads.txt is authorized, a current certified CMP is live,
 * and the production CSP has passed the strict-CSP migration gate documented
 * in docs/ADSENSE_READINESS.md.
 */

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  page?: string;
  adFormat?: "rectangle" | "leaderboard" | "skyscraper" | "auto";
};

export function AdSlot(props: AdSlotProps) {
  void props;
  return null;
}

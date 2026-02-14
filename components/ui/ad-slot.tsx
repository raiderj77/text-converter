/**
 * Ad slot placeholder component.
 *
 * SETUP INSTRUCTIONS:
 * 1. Start with Google AdSense (no traffic minimum)
 *    - Replace the placeholder div with AdSense ad unit code
 *    - Use responsive ad units that adapt to container width
 *
 * 2. Upgrade to Mediavine at 50k sessions/month
 *    - Mediavine will inject ads automatically via their script
 *    - Keep these slots as fallback/supplemental placements
 *
 * 3. Or use Ezoic (10k+ pageviews/month threshold)
 *
 * SLOT POSITIONS (per tool page):
 *   "after-tool"    — Between interactive tool and SEO content (highest value)
 *   "mid-content"   — Between SEO sections (good viewability)
 *   "before-footer"  — Above internal links section (bonus impression)
 *
 * Each slot has a unique ID for ad network targeting.
 */

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  /** Page identifier for unique ad unit IDs, e.g. "home", "word-counter" */
  page?: string;
};

export function AdSlot({ slot, page = "default" }: AdSlotProps) {
  const id = `ad-${page}-${slot}`;

  return (
    <div className="my-8" id={id}>
      <div className="mx-auto max-w-3xl">
        {/* 
          REPLACE THIS DIV WITH YOUR AD NETWORK CODE
          
          For AdSense, it will look something like:
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          
          For now, this is an invisible placeholder that takes no space
          in production. Set SHOW_AD_PLACEHOLDERS=true in env to see them.
        */}
        {process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true" && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-900/50 p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              Ad: {slot}
            </div>
            <div className="mt-1 text-xs text-neutral-600">
              {slot === "after-tool" && "728x90 or responsive — highest value placement"}
              {slot === "mid-content" && "336x280 or responsive — mid-scroll placement"}
              {slot === "before-footer" && "728x90 or responsive — end-of-content placement"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

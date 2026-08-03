# FlipMyCase AdSense activation gate

Advertising is intentionally disabled in `components/ui/ad-slot.tsx`. Do not add
the AdSense loader, Auto ads code, manual units, or an environment-variable bypass
until every item below is verified against the production site and current account.

## Required before activation

- AdSense lists `flipmycase.com` as **Ready**, not Getting ready, Requires review,
  or Needs attention.
- AdSense reports the site's `ads.txt` seller row as authorized. The file must keep
  `OWNERDOMAIN=flipmycase.com`; add `MANAGERDOMAIN` only if a real external primary
  or exclusive monetization manager is under contract.
- A Google-certified CMP is published for the site and produces current IAB TCF v2.3
  consent signals in the EEA, UK, and Switzerland before an ad tag is called.
- The production Content Security Policy has been migrated and tested with the
  current Google-supported strict-CSP implementation. Do not expand a static domain
  allowlist and assume it will remain compatible.
- Privacy and cookie notices accurately name every advertising purpose, recipient,
  storage mechanism, visitor choice, and withdrawal path that is actually enabled.
- Ad placement is tested at 320px and common desktop widths for overlap, accidental
  clicks, layout shift, keyboard focus, and content-to-ad balance.
- Production verification confirms that tool input, output, files, URL query strings,
  and settings are never included in ad or analytics requests.

## Release sequence

1. Implement the CMP and strict CSP behind a reviewed code change.
2. Verify the production consent and CSP behavior with ads still disabled.
3. Confirm the AdSense site and `ads.txt` account states.
4. Enable ads in a separate release, starting with low-density placements away from
   conversion controls, copy/download buttons, and privacy or legal pages.
5. Re-run accessibility, performance, policy, and production network checks.

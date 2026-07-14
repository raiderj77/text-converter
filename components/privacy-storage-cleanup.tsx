"use client";

import { useEffect } from "react";

// Older releases saved pasted text and generated credentials in localStorage.
// Current privacy-sensitive tools keep that content in memory only. Remove the
// retired keys on any visit so previously saved values do not remain behind.
const RETIRED_CONTENT_KEYS = [
  "fmc_text",
  "fmc_jf_text",
  "fmc_jwt_input",
  "fmc_diff_a",
  "fmc_diff_b",
  "fmc_tc_text",
  "fmc_ptc_text",
  "fmc_extract_urls_text",
  "fmc_find_replace_text",
  "fmc_remove_html_text",
  "fmc_text_to_list_text",
  "fmc_se_text",
  "fmc_qr_code",
] as const;

export function PrivacyStorageCleanup() {
  useEffect(() => {
    for (const key of RETIRED_CONTENT_KEYS) {
      localStorage.removeItem(key);
    }
  }, []);

  return null;
}

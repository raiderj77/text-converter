import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/config";

export async function POST(request: NextRequest) {
  const { urls } = await request.json();
  const key = process.env.INDEXNOW_API_KEY;
  const host = SITE_URL.replace("https://", "");

  if (!key) {
    return NextResponse.json({ error: "Missing INDEXNOW_API_KEY" }, { status: 500 });
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });

  return NextResponse.json({ status: response.status });
}

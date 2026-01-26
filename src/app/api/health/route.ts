import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      ts: new Date().toISOString(),
      env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
      region: process.env.VERCEL_REGION ?? "unknown",
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    },
    { status: 200 }
  );
}

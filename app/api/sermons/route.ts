import { NextRequest, NextResponse } from "next/server";
import { getSermons, ISermonsType } from "@/app/(util)/db/lib/sermons";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<SermonsGetResponse>> {
  let payload: ISermonsType = null;
  const page: number = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit: number = parseInt(req.nextUrl.searchParams.get("limit") || "1");
  const type: number = parseInt(req.nextUrl.searchParams.get("type") || "0");

  try {
    const offset = (page - 1) * limit;

    payload = await getSermons({ limit, offset, type });
    if (payload === null) throw new Error("failed");
    return NextResponse.json({ payload, server: "success" });
  } catch (error: any) {
    if (payload === null) {
      return NextResponse.json({
        payload: {
          total: 0,
          sermons: [],
          totalPages: 0,
        },
        server: "failed",
        error,
      });
    }
    return NextResponse.json({ payload: null, server: "success", error });
  }
}

export type SermonsGetResponse = {
  payload: ISermonsType;
  server: "failed" | "success";
  error?: unknown;
};

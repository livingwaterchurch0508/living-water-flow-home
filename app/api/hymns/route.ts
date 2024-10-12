import { NextRequest, NextResponse } from "next/server";
import { IHymnsType, getHymns } from "@/app/(util)/db/sqlite/hymns";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<HymnsGetResponse>> {
  let payload: IHymnsType = null;
  const page: number = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit: number = parseInt(req.nextUrl.searchParams.get("limit") || "1");
  const type: number = parseInt(req.nextUrl.searchParams.get("type") || "0");

  try {
    const offset = (page - 1) * limit;

    payload = await getHymns({ limit, offset, type });
    if (payload === null) throw new Error("failed");
    return NextResponse.json({ payload, server: "success" });
  } catch (error: any) {
    if (payload === null) {
      return NextResponse.json({
        payload: {
          total: 0,
          hymns: [],
          totalPages: 0,
        },
        server: "failed",
        error,
      });
    }
    return NextResponse.json({ payload: null, server: "success", error });
  }
}

export type HymnsGetResponse = {
  payload: IHymnsType;
  server: "failed" | "success";
  error?: unknown;
};

import { NextRequest, NextResponse } from "next/server";
import {
  getCommunities,
  ICommunitiesType,
} from "@/app/(util)/db/mysql/communities";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<CommunitiesGetResponse>> {
  let payload: ICommunitiesType = null;
  const page: number = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit: number = parseInt(req.nextUrl.searchParams.get("limit") || "10");
  const type: number = parseInt(req.nextUrl.searchParams.get("type") || "3");

  try {
    const offset = (page - 1) * limit;

    payload = await getCommunities({ limit, offset, type });
    if (payload === null) throw new Error("failed");
    return NextResponse.json({ payload, server: "success" });
  } catch (error: any) {
    if (payload === null) {
      return NextResponse.json({
        payload: {
          total: 0,
          communities: [],
          totalPages: 0,
        },
        server: "failed",
        error,
      });
    }
    return NextResponse.json({ payload: null, server: "success", error });
  }
}

export type CommunitiesGetResponse = {
  payload: ICommunitiesType;
  server: "failed" | "success";
  error?: unknown;
};

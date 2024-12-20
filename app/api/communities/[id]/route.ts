import { NextRequest, NextResponse } from "next/server";
import {
  getCommunitiesById,
  ICommunityType,
} from "@/app/(util)/db/sqlite/communities";

export async function GET(
  req: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  },
): Promise<NextResponse<CommunityGetResponse>> {
  let payload: ICommunityType = null;
  const type: number = parseInt(req.nextUrl.searchParams.get("type") || "0");

  try {
    if (id) payload = await getCommunitiesById(+id, +type);
    if (payload === null) throw new Error("failed");
    return NextResponse.json({ payload, server: "success" });
  } catch (error: any) {
    if (payload === null) {
      return NextResponse.json({ payload: {}, server: "failed", error });
    }
    return NextResponse.json({ payload: null, server: "success", error });
  }
}

export type CommunityGetResponse = {
  payload: ICommunityType;
  server: "failed" | "success";
  error?: unknown;
};
